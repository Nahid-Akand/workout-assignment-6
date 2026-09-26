import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Your workout companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <FitLogProvider>
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />

          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="dark"
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </FitLogProvider>
      </body>
    </html>
  );
}

