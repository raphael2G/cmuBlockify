import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "CMU Blockify",
  description: "The home for trading blocks like commodities",
  openGraph: {
    title: "CMU Blockify",
    description: "The home for trading blocks like commodities",
    url: "https://blockify.online", // Replace with your actual domain
    siteName: "CMU Blockify",
    images: [
      {
        url: "/thumbnail.jpg", // Path to your thumbnail image
        width: 800,           // Adjust to your image's dimensions
        height: 600,
        alt: "CMU Blockify Thumbnail",
        type: "image/jpeg",   // Adjust if your image is not a JPEG
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CMU Blockify",
    description: "The home for trading blocks like commodities",
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}
//         <Toaster richColors/>
//       </body>
//     </html>
//   );
// }
