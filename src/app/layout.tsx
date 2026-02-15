import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyanshu Kumar Jha",
  description:
    "Full-stack developer obsessed with clean UI, performance, and scalable systems. Building with React/Next.js while learning deep learning and exploring OS internals & WebAssembly.",
  keywords: [
    "Priyanshu Kumar Jha",
    "full stack developer",
    "portfolio",
    "React",
    "Next.js",
    "WebAssembly",
    "systems programming",
  ],
  authors: [{ name: "Priyanshu Kumar Jha" }],
  openGraph: {
    title: "Priyanshu Kumar Jha — Developer Console",
    description:
      "Full stack developer & systems enthusiast. Building fast, clean web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased power-on">{children}</body>
    </html>
  );
}
