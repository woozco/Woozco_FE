"use client";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <html lang="en">
                <title>Woozco</title>
                <meta
                    name="description"
                    content="우지코 : 우리들의 지혜로운 코딩테스트 준비"
                ></meta>
                <body className={font.className}>{children}</body>
            </html>
        </>
    );
}
