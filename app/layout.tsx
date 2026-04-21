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