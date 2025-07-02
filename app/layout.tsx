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
              <Link href="/"><h1>Home</h1></Link>
              <Link href="/log"><h1>Log activity</h1></Link>
              <Link href="/add-activity"><h1>Add activity</h1></Link>
            </div>
          </header>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}
