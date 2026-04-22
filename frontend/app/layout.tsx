/**
 * @file page.tsx
 * @copyright 2026 Rivindu Sanjula. All Rights Reserved.
 * @license Proprietary Commercial Software
 * * Prepared exclusively for Liyonta Tea.
 * This software is provided under a commercial agreement. The source code, 
 * database schemas, and proprietary business logic contained within this 
 * file are the confidential and proprietary information of Liyonta Tea 
 * and its authorized developers.
 * * Unauthorized copying, distribution, or modification of this codebase, 
 * via any medium, is strictly prohibited. This is closed-source software. 
 * No open-source license is granted.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liyonta Tea | Purchase Order",
  description: "Enterprise Purchase Order Generation System for Liyonta Tea",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        {/* Navigation could go here */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer could go here */}
      </body>
    </html>
  );
}