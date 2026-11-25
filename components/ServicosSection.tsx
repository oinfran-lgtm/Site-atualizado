import { buscarServicos, agruparPorCategoria, formatarPreco, formatarDuracao, gerarJsonLdDoCatalogo } from "@/lib/servicos";
import "./servicos.css";

export default async function ServicosSection() {
  const grupos = agruparPorCategoria(await buscarServicos());
  return (
    <section id="servicos" className="secao-servicos">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: gerarJsonLdDoCatalogo(grupos) }} />
      <h2>Serviços e preços</h2>
      {grupos.map((grupo) => (
        <div key={grupo.categoria}>
          <h3 className="categoria"><span aria-hidden="true">{grupo.emoji}</span> {grupo.categoria}</h3>
          <div className="lista-servicos">
            {grupo.servicos.map((servico) => (
              <article className="servico" key={servico.id}>
                <div className="topo">
                  <h4>{servico.nome}</h4>
                  <b>{formatarPreco(servico.preco)}</b>
                </div>
                {servico.duracao > 0 && <p className="duracao">{formatarDuracao(servico.duracao)}</p>}
                {servico.descricao && <p className="descricao">{servico.descricao}</p>}
              </article>
            ))}
          </div>
        </div>
      ))}
      <p className="aviso">Valores sujeitos a alteração. Confirme no WhatsApp ao agendar.</p>
    </section>
  );
}
