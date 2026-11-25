import { perguntasFrequentes } from "@/lib/seo";

export default function FaqSection() {
  return (
    <section id="faq" className="secao-faq">
      <h2>Perguntas frequentes</h2>
      {perguntasFrequentes.map((item) => (
        <details key={item.pergunta} className="faq-item">
          <summary>{item.pergunta}</summary>
          <p>{item.resposta}</p>
        </details>
      ))}
    </section>
  );
}
