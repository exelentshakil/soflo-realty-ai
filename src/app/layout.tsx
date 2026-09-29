import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} • ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="https://media.pandaidx.com/app/65368b3913315d8344407428/settings/favicon/f5a56a24-a675-4f92-8c29-23b67fc82a34.png" />
        <link rel="apple-touch-icon" href="https://media.pandaidx.com/app/65368b3913315d8344407428/settings/favicon/f5a56a24-a675-4f92-8c29-23b67fc82a34.png" />
        {/* Preload primary Söhne & Söhne Mono font cuts for zero layout shift (CLS 0.00) */}
        <link rel="preload" href="/sohne-font-family/TestSohne-Buch-BF663d89cd32e6a.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/sohne-font-family/TestSohne-Halbfett-BF663d89cd2d67b.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/sohne-font-family/TestSohne-Dreiviertelfett-BF663d89ccc5f66.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        {/* Preload SF Pro Display for clean modern Apple & Stripe SaaS hierarchy */}
        <link rel="preload" href="/sf-pro-display/SFPRODISPLAYREGULAR.OTF" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/sf-pro-display/SFPRODISPLAYMEDIUM.OTF" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] antialiased selection:bg-[#C5A880]/20 selection:text-[#C5A880] dark:selection:text-[#C5A880]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey={`${siteConfig.slug || 'demo'}-theme`}
        >
          {children}
        </ThemeProvider>
        {/* Centralized Demo Telemetry Tracker & Upwork Job Attribution */}
        <script
          defer
          src="https://demo-traffic.vercel.app/tracker.js"
          data-project={siteConfig.slug || 'demo-cockpit'}
        />
        <img
          src={`https://demo-traffic.vercel.app/api/px?p=${siteConfig.slug || 'demo-cockpit'}`}
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      </body>
    </html>
  );
}
