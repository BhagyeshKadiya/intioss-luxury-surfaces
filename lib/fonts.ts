import {
  Montserrat,
  Marcellus,
  Raleway,
} from "next/font/google";

export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fontMarcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

export const fontRaleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

export const fontVariables = `${fontMontserrat.variable} ${fontMarcellus.variable} ${fontRaleway.variable}`;
