import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/navigation";
import QueryProvider from "@/QueryProvider";
import Footer from "../components/custom-ui/Common/Footer";
import { getUserSession } from "@/lib/session";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TedFlix",
  description:
    "We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserSession();
  return (
    <QueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="shadow-banner relative h-screen lg:h-[140vh]">
            <Navigation user={user as string} />
            {children}
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}
