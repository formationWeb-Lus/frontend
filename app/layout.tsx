import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PayLink",
  description:
    "Plateforme de paiement permettant aux entreprises d'accepter les paiements Mobile Money et cartes bancaires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="min-h-screen bg-[#08192D] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}