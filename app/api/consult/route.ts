import { NextResponse } from "next/server";
import { z } from "zod";

const consultSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City is required"),
  projectType: z.enum(["Residential", "Commercial", "Hospitality", "Architect-Designer"]),
  interestedIn: z.array(z.string()).min(1, "Select at least one surface category"),
  approxArea: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected"), // Honeypot spam trap
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = consultSchema.parse(body);

    // Spam honeypot validation
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Stubbed Resend email execution
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      // In production, instantiate Resend and send notification
      console.log("[Resend Email Stub] Notification dispatched for:", validatedData.email);
    } else {
      console.log("[Resend Stub] RESEND_API_KEY not configured. Mocking email delivery.");
    }

    // Stubbed CRM / Webhook sync
    console.log("[CRM Webhook Stub] Lead logged:", validatedData.fullName, validatedData.city);

    // Pre-calculate prefilled WhatsApp link for direct concierge handoff
    const waText = `New Private Consultation Request:\n• Name: ${validatedData.fullName}\n• Phone: ${validatedData.phone}\n• City: ${validatedData.city}\n• Type: ${validatedData.projectType}\n• Surfaces: ${validatedData.interestedIn.join(", ")}\n• Area: ${validatedData.approxArea || "TBD"} sq ft`;

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
