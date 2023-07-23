import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navigation from "@/components/ui/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TedFlix",
  description:
    "We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto w-[90%] max-w-[112.5rem]">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
