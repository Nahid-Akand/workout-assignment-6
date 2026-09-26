import type { Metadata } from "next";
import { FitLogProvider } from "@/context/FitLogContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>{children}</FitLogProvider>
      </body>
    </html>
  );
}