import ServicosSection from "@/components/ServicosSection";
import FaqSection from "@/components/FaqSection";
export const revalidate = 3600;
export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <header>
        <a href="/" aria-label="Orestes Cabeleireiro | Barbearia BC"><img src="/logo.webp" alt="Orestes Cabeleireiro | Barbearia BC - Social Club" width="56" height="56" fetchpriority="high" style="width:56px;height:56px;object-fit:contain" /></a><h1 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Orestes Cabeleireiro | Barbearia Social Club</h1>
        <p>Av. Martin Luther, 188 — Nações, Balneário Camboriú</p>
        <p>
          <a href="https://wa.me/5547992143774" style={{ background: "#25d366", color: "#fff", padding: "12px 18px", borderRadius: 10, textDecoration: "none", display: "inline-block", fontWeight: 700 }}>
            Agendar pelo WhatsApp
          </a>
        </p>
      </header>
      <ServicosSection />
      <FaqSection />
      <footer style={{ marginTop: 40, borderTop: "1px solid #e6e0d6", paddingTop: 16 }}>
        <p>Segunda, das 10h30 às 18h; terça a quinta, das 9h30 às 18h; sexta, das 9h30 às 17h; sábado, das 12h às 17h.</p>
        <p>WhatsApp: (47) 99214-3774</p>
      </footer>
    </main>
  );
}
