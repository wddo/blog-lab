import AuthGuard from "@/components/auth/AuthGuard";
import UserProvider from "@/providers/UserProvider";
import type { Metadata } from "next";
import { Noto_Sans_KR, Roboto } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "Blog Lab",
  description:
    "Blog Lab is a blog platform for sharing your thoughts and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${notoSansKr.variable}`}>
        <UserProvider>
          <Suspense fallback={null}>
            <AuthGuard />
          </Suspense>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
