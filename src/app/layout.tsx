// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fintech PMS",
  description: "Payment Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="transition-colors duration-300">
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}