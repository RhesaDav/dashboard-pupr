import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Bina Marga Papua Barat",
  description: "Aplikasi dashboard resmi untuk monitoring dan manajemen infrastruktur jalan di Papua Barat",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true, // iOS web app capable
    statusBarStyle: "default", // 'black-translucent' atau 'default'
    title: "Bina Marga PB", // Nama singkat saat ditambahkan ke home screen iOS
    // startupImage: [ // Anda bisa menambahkan splash screen untuk iOS
    //   '/splash/iphone5_splash.png',
    //   {
    //     url: '/splash/iphone6_splash.png',
    //     media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    //   },
    // ],
  },
  formatDetection: {
    telephone: false, // Nonaktifkan auto-deteksi nomor telepon
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BinaMargaPB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
