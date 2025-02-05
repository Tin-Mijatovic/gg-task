import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PostsProvider } from "@/context/PostsContext";
import { fetchPosts } from "@/lib/api";
import { PostType } from "@/lib/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GoodGuys Task",
    template: "%s | GoodGuys Task",
  },
  openGraph: {
    description: "Job application task for GoodGuys",
    images: [""],
  },
  metadataBase: new URL(`${process.env.PUBLIC_APP_URL}/`),
  keywords: ["GoodGuys", "Task", "Test"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPosts: PostType[] = await fetchPosts();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostsProvider initialPosts={initialPosts}>
          <Navbar />
          {children}
        </PostsProvider>
      </body>
    </html>
  );
}
