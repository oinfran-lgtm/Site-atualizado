import type { Metadata } from "next";
const SITE = "https://orestescabeleireiro.com.br";
const NOME = "Orestes Cabeleireiro | Barbearia Social Club";
const LOGO = `${SITE}/logo.webp`;
const TELEFONE = "+55-47-99214-3774";
const TELEFONE_VISIVEL = "(47) 99214-3774";
const INSTAGRAM = "https://www.instagram.com/orestescabeleireiro_bc";
const GOOGLE_MAPS = "https://maps.app.goo.gl/vA2XW53ruoLVqw4g7";
const NOTA_GOOGLE = { nota: "5.0", avaliacoes: "93" };
const TITULO = "Orestes Cabeleireiro | Barbearia Social Club – Nações, Balneário Camboriú";
const DESCRICAO = "Cabeleireiro e barbearia no bairro Nações, Balneário Camboriú: cortes masculinos e femininos, barba, escova e botox. Nota 5,0 no Google. Agende pelo WhatsApp.";
export const metadataDoSite: Metadata = {
  metadataBase: new URL(SITE),
  title: TITULO,
  description: DESCRICAO,
  keywords: ["cabeleireiro balneário camboriú","barbearia balneário camboriú","barbearia nações balneário camboriú","cabeleireiro nações bc","corte masculino balneário camboriú","corte feminino balneário camboriú","escova progressiva balneário camboriú","botox capilar balneário camboriú","barba na navalha","barboterapia","clube de assinatura barbearia"],
  authors: [{ name: NOME }],
  publisher: NOME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: `${SITE}/` },
  verification: { google: "ylElAgzEUB_FlaaSnHT6oFLoc07Qw5o05VGSCUSEX3E" },
  openGraph: { type: "website", locale: "pt_BR", url: `${SITE}/`, siteName: NOME, title: TITULO, description: DESCRICAO, images: [{ url: LOGO, width: 640, height: 640, alt: `Logo ${NOME}` }] },
  twitter: { card: "summary", title: TITULO, description: DESCRICAO, images: [LOGO] },
};
export const jsonLdNegocio = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BarberShop"],
  "@id": SITE,
  name: NOME,
  description: "Salão e barbearia no bairro Nações, em Balneário Camboriú, com cortes masculinos e femininos, barba, escovas, tratamentos capilares e clube de assinatura.",
  url: SITE,
  image: LOGO,
  logo: LOGO,
  telephone: TELEFONE,
  priceRange: "$$",
  address: { "@type": "PostalAddress", streetAddress: "Av. Martin Luther, 188", addressLocality: "Balneário Camboriú", addressRegion: "SC", postalCode: "88338-038", addressCountry: "BR" },
  areaServed: { "@type": "Place", name: "Nações, Balneário Camboriú" },
  geo: { "@type": "GeoCoordinates", latitude: -26.980767, longitude: -48.642617 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "10:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday"], opens: "09:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:30", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "17:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: NOTA_GOOGLE.nota, bestRating: "5", reviewCount: NOTA_GOOGLE.avaliacoes },
  sameAs: [INSTAGRAM, GOOGLE_MAPS],
  potentialAction: { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE}/agendar`, actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] }, result: { "@type": "Reservation", name: "Agendamento de serviço" } },
};
export const perguntasFrequentes = [
  { pergunta: "Qual o horário de funcionamento?", resposta: "Segunda, das 10h30 às 18h; terça a quinta, das 9h30 às 18h; sexta, das 9h30 às 17h; sábado, das 12h às 17h. Fechado aos domingos." },
  { pergunta: "Quanto custa um corte?", resposta: "Masculino: máquina total R$ 50, cabelo máquina e tesoura ou pente e tesoura R$ 65. Feminino: corte R$ 100. Unissex: corte curto R$ 100 e corte longo R$ 125." },
  { pergunta: "Onde fica o Orestes Cabeleireiro | Barbearia Social Club?", resposta: "Av. Martin Luther, 188, bairro Nações, Balneário Camboriú – SC, CEP 88338-038." },
  { pergunta: "Qual a avaliação no Google?", resposta: `Nota ${NOTA_GOOGLE.nota.replace(".", ",")} com ${NOTA_GOOGLE.avaliacoes} avaliações no Google.` },
  { pergunta: "Vocês atendem mulheres?", resposta: "Sim. Há corte, escova, escova progressiva orgânica, botox, hidratação, cauterização, mechas e sobrancelha com henna." },
  { pergunta: "Como funciona o clube de assinatura?", resposta: "Planos mensais a partir de R$ 159,90, com cortes semanais, 50% de desconto em serviços adicionais e 10% em produtos. Há opções para cabelo, barba ou combo." },
  { pergunta: "Quais formas de pagamento são aceitas?", resposta: "Dinheiro, PIX e cartões de débito e crédito (Visa, Mastercard, Elo e American Express). As assinaturas do clube podem ser pagas no cartão de crédito com recorrência." },
  { pergunta: "Como agendar?", resposta: `Pelo WhatsApp ${TELEFONE_VISIVEL}, pelo site orestescabeleireiro.com.br/agendar ou presencialmente.` },
  { pergunta: "Atende sem agendamento?", resposta: "Atendemos por ordem de chegada, mas recomendamos agendar pelo site ou pelo WhatsApp para garantir o seu horário." },
];
export const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntasFrequentes.map((item) => ({ "@type": "Question", name: item.pergunta, acceptedAnswer: { "@type": "Answer", text: item.resposta } })),
};
export const jsonLdMigalhas = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: SITE },
    { "@type": "ListItem", position: 2, name: "Agendar", item: `${SITE}/agendar` },
  ],
};
export const paraTextoSeguro = (dados: object) => JSON.stringify(dados).replace(/</g, "\\u003c");
