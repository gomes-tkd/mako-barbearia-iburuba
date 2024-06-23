import { Roboto, Spectral } from "next/font/google";

export const type_first = Roboto({
    weight: ["900", "700", "400"],
    subsets: ["latin"],
    variable: "--type-first-roboto",
    display: "swap",
});

export const type_second = Spectral({
    weight: ['700'],
    subsets: ['latin'],
    variable: '--type-second-spectral',
    display: 'swap',
});
