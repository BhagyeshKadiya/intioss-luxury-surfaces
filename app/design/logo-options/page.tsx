import type { Metadata } from "next";
import { LogoOptionsClient } from "./LogoOptionsClient";

export const metadata: Metadata = {
  title: "Logo Placement Design Options | INTIOSS Internal Preview",
  description: "Internal design proposals for INTIOSS logo placement without heavy plinth box.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LogoOptionsPage() {
  return <LogoOptionsClient />;
}
