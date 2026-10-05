import {
  Forum,
  Marcellus,
  Castoro_Titling,
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

export const fontVariables = `${fontForum.variable} ${fontMarcellus.variable} ${fontCastoro.variable}`;
