import {
  Forum,
  Marcellus,
  Castoro_Titling,
  Inter,
  Jost,
  Montserrat,
  Poppins,
} from "next/font/google";

export const fontForum = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-forum",
  display: "swap",
});

export const fontMarcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

export const fontCastoro = Castoro_Titling({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-castoro",
  display: "swap",
});

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontJost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const fontVariables = `${fontForum.variable} ${fontMarcellus.variable} ${fontCastoro.variable} ${fontInter.variable} ${fontJost.variable} ${fontMontserrat.variable} ${fontPoppins.variable}`;

