"use client";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/queryClient";

const font = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <html lang="en">
                    <title>Woozco</title>
                    <meta
                        name="description"
                        content="우지코 : 우리들의 지혜로운 코딩테스트 준비"
                    ></meta>
                    <body className={font.className}>{children}</body>
                </html>
            </QueryClientProvider>
        </>
    );
}
