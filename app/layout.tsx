
import "./globals.css";
import localFont from "next/font/local";
import React from "react";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ItsNous",
  description: "A news app for the modern age. It is a place where you can find the latest news, and stay informed. You can also interact with other users and share your thoughts regarding stories.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          showOptionalFields: false,
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
          helpPageUrl: '/help',
          privacyPageUrl: '/privacy',
          termsPageUrl: '/terms',
        },
      }}
      signInFallbackRedirectUrl={"/sign-in"}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
