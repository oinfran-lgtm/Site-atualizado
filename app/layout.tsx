import { metadataDoSite, jsonLdNegocio, jsonLdFaq, jsonLdMigalhas, paraTextoSeguro } from "@/lib/seo";
export const metadata = metadataDoSite;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: paraTextoSeguro(jsonLdNegocio) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: paraTextoSeguro(jsonLdFaq) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: paraTextoSeguro(jsonLdMigalhas) }} />
        {children}
      </body>
    </html>
  );
}
