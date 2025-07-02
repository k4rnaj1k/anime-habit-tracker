import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BackgroundWrapper } from "./components/bg-wrapper/bg-wrapper";

export const metadata: Metadata = {
  title: "k4rnaj1k's habit tracker",
  description: "Mostly adapted for phone in horizontal position.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundWrapper>
          <header>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Link href="/"><h2>Home</h2></Link>
              <Link href="/log"><h2>Log activity</h2></Link>
              <Link href="/add-activity"><h2>Add activity</h2></Link>
            </div>
          </header>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}
