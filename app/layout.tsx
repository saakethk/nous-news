import {
  ClerkProvider
} from '@clerk/nextjs'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { dark } from '@clerk/themes';

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
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
