const ID_DO_PROJETO = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const NOME_DA_COLECAO = "services";
const NOMES_DOS_CAMPOS = {
  nome: ["name", "nome"],
  preco: ["price", "preco"],
  duracao: ["duration", "duracao"],
  descricao: ["description", "descricao"],
  categoria: ["category", "categoria"],
  ativo: ["active", "ativo"],
  ordem: ["order", "ordem"],
};
export type Categoria = "Masculino" | "Feminino" | "Unissex / Outros";
export type Servico = { id: string; nome: string; preco: number; duracao: number; descricao: string; categoria: Categoria; ordem: number; };
export type GrupoDeCategoria = { categoria: Categoria; emoji: string; servicos: Servico[]; };
const CATEGORIAS_NA_ORDEM: { categoria: Categoria; emoji: string }[] = [
  { categoria: "Masculino", emoji: "👨" },
  { categoria: "Feminino", emoji: "👩" },
  { categoria: "Unissex / Outros", emoji: "✂️" },
];
type ValorDoFirestore = Record<string, any>;
function lerValor(campo?: ValorDoFirestore) {
  if (!campo) return undefined;
  if ("stringValue" in campo) return campo.stringValue;
  if ("integerValue" in campo) return Number(campo.integerValue);
  if ("doubleValue" in campo) return campo.doubleValue;
  if ("booleanValue" in campo) return campo.booleanValue;
  return undefined;
}
function escolherCampo(campos: Record<string, ValorDoFirestore>, nomesPossiveis: string[]) {
  const encontrado = nomesPossiveis.map((nome) => campos[nome]).find(Boolean);
  return lerValor(encontrado);
}
function padronizarCategoria(valor: unknown): Categoria {
  const texto = String(valor ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (texto.startsWith("masc")) return "Masculino";
  if (texto.startsWith("fem")) return "Feminino";
  return "Unissex / Outros";
}
export async function buscarServicos(): Promise<Servico[]> {
  const resultado: Servico[] = [];
  let proximaPagina = "";
  do {
    const endereco = `https://firestore.googleapis.com/v1/projects/${ID_DO_PROJETO}/databases/(default)/documents/${NOME_DA_COLECAO}` + `?pageSize=300${proximaPagina ? `&pageToken=${encodeURIComponent(proximaPagina)}` : ""}`;
    const resposta = await fetch(endereco, { next: { revalidate: 3600 } });
    if (!resposta.ok) { return SERVICOS_FIXOS; }
    const dados = await resposta.json();
    for (const documento of dados.documents ?? []) {
      const campos = documento.fields ?? {};
      if (escolherCampo(campos, NOMES_DOS_CAMPOS.ativo) === false) continue;
      resultado.push({
        id: String(documento.name).split("/").pop()!,
        nome: String(escolherCampo(campos, NOMES_DOS_CAMPOS.nome) ?? ""),
        preco: Number(escolherCampo(campos, NOMES_DOS_CAMPOS.preco) ?? 0),
        duracao: Number(escolherCampo(campos, NOMES_DOS_CAMPOS.duracao) ?? 0),
        descricao: String(escolherCampo(campos, NOMES_DOS_CAMPOS.descricao) ?? ""),
        categoria: padronizarCategoria(escolherCampo(campos, NOMES_DOS_CAMPOS.categoria)),
        ordem: Number(escolherCampo(campos, NOMES_DOS_CAMPOS.ordem) ?? 0),
      });
    }
    proximaPagina = dados.nextPageToken ?? "";
  } while (proximaPagina);
  return resultado.filter((servico) => servico.nome);
}
export function agruparPorCategoria(servicos: Servico[]): GrupoDeCategoria[] {
  return CATEGORIAS_NA_ORDEM.map((item) => ({
    categoria: item.categoria,
    emoji: item.emoji,
    servicos: servicos.filter((servico) => servico.categoria === item.categoria).sort((a, b) => a.ordem - b.ordem),
  })).filter((grupo) => grupo.servicos.length > 0);
}
export function formatarPreco(valor: number) {
  return "R$ " + (Number.isInteger(valor) ? String(valor) : valor.toFixed(2).replace(".", ","));
}
export function formatarDuracao(minutos: number) {
  if (!minutos) return "";
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas && resto) return `${horas}h${String(resto).padStart(2, "0")}`;
  if (horas) return `${horas}h`;
  return `${minutos} min`;
}
export function gerarJsonLdDoCatalogo(grupos: GrupoDeCategoria[]) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://orestescabeleireiro.com.br",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de serviços",
      itemListElement: grupos.map((grupo) => ({
        "@type": "OfferCatalog",
        name: grupo.categoria,
        itemListElement: grupo.servicos.map((servico) => ({
          "@type": "Offer",
          priceCurrency: "BRL",
          price: servico.preco.toFixed(2),
          itemOffered: { "@type": "Service", name: servico.nome, description: servico.descricao },
        })),
      })),
    },
  };
  return JSON.stringify(dados).replace(/</g, "\\u003c");
}
