import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import GoogleAuthHandler from "@/Component/Shared/GoogleAuthHandler";
import { ThemeProvider } from "@/Component/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: "AI Travel Booking Platform",
  description: "Book your next adventure with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning যোগ করা জরুরি
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class" // টেলউইন্ডের 'class' মোড ব্যবহার করবে
          defaultTheme="light" // ইউজারের পিসির থিম অনুযায়ী অটো সেট হবে
          enableSystem={false}
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <GoogleAuthHandler />
          </Suspense>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
