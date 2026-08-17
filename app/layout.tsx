import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://paylinks.coderise-solution.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PayLink | Marketing digital pour attirer plus de clients",
    template: "%s | PayLink",
  },

  description:
    "PayLink aide les entrepreneurs et les entreprises à développer leur visibilité en ligne, attirer de nouveaux clients et augmenter leurs ventes grâce au marketing digital.",

  keywords: [
    "PayLink",
    "marketing digital",
    "marketing digital RDC",
    "marketing digital Congo",
    "agence marketing digital",
    "publicité Facebook",
    "publicité Instagram",
    "acquisition clients",
    "attirer plus de clients",
    "communication digitale",
    "vente en ligne",
    "entrepreneurs RDC",
    "entreprises RDC",
  ],

  authors: [
    {
      name: "PayLink",
      url: siteUrl,
    },
  ],

  creator: "PayLink",
  publisher: "PayLink",

  // Google Search Console
  verification: {
    google: "TON_CODE_GOOGLE",
  },

  applicationName: "PayLink",

  category: "business",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "PayLink",

    title: "PayLink | Attirez plus de clients grâce au marketing digital",

    description:
      "Développez votre visibilité, attirez de nouveaux clients et transformez votre audience en ventes grâce au marketing digital.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PayLink - Marketing digital pour entreprises",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "PayLink | Attirez plus de clients",

    description:
      "Développez votre visibilité et attirez plus de clients grâce au marketing digital.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}