import { NextResponse } from "next/server";
import { z } from "zod";

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodic cleanup of rate limit map using forEach for universal TS target compatibility
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps, ip) => {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  });
}, 5 * 60 * 1000);

const consultSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name exceeds maximum allowed length"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email exceeds maximum length"),
  city: z.string().trim().min(2, "City is required").max(80, "City exceeds maximum length"),
  consultationMode: z.enum(["Online", "Offline"]).optional().default("Offline"),
  projectType: z.enum(["Residential", "Commercial", "Hospitality", "Architect-Designer"]),
  interestedIn: z
    .array(z.string().trim().max(80))
    .min(1, "Select at least one surface category")
    .max(20, "Too many categories selected"),
  approxArea: z.string().trim().max(50).optional(),
  preferredDate: z.string().trim().max(30).optional(),
  preferredTime: z.string().trim().max(50).optional(),
  message: z.string().trim().max(1000, "Notes cannot exceed 1000 characters").optional(),
  honeypot: z.string().max(0, "Spam detected"), // Honeypot spam trap
});

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();

    const clientTimestamps = rateLimitMap.get(ip) || [];
    const recentRequests = clientTimestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // 2. Payload size safety check
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 50 * 1024) {
      return NextResponse.json(
        { success: false, error: "Request payload too large" },
        { status: 413 }
      );
    }

    const body = await request.json();
    const validatedData = consultSchema.parse(body);

    // 3. Spam honeypot validation
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // 4. Stubbed Resend email execution
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      console.log("[Resend Email Stub] Notification dispatched for:", validatedData.email);
    }

    // 5. Stubbed CRM / Webhook sync
    console.log(
      "[CRM Webhook Stub] Lead logged:",
      validatedData.fullName,
      validatedData.city,
      validatedData.consultationMode
    );

    // 6. Pre-calculate prefilled WhatsApp link for direct concierge handoff
    const modeLabel =
      validatedData.consultationMode === "Online"
        ? "Virtual Video Concierge (Online)"
        : "In-Person Studio Visit (Offline)";

    const waText = `New Private Consultation Request:\n• Consultation Mode: ${modeLabel}\n• Name: ${validatedData.fullName}\n• Phone: ${validatedData.phone}\n• Email: ${validatedData.email}\n• Location / Studio: ${validatedData.city}\n• Preferred Date: ${validatedData.preferredDate || "Flexible"}\n• Preferred Time: ${validatedData.preferredTime || "Flexible"}\n• Project Type: ${validatedData.projectType}\n• Surfaces: ${validatedData.interestedIn.join(", ")}\n• Approx Area: ${validatedData.approxArea ? `${validatedData.approxArea} sq ft` : "Not specified"}${validatedData.message ? `\n• Notes: ${validatedData.message}` : ""}`;

    return NextResponse.json({
      success: true,
      message: "Consultation request received successfully.",
      whatsAppUrl: `https://wa.me/919930171094?text=${encodeURIComponent(waText)}`,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
