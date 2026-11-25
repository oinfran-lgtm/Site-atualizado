import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(pedido: Request) {
  const tokenDeLogin = pedido.headers.get("authorization")?.replace("Bearer ", "");
  if (!tokenDeLogin) { return NextResponse.json({ erro: "Você precisa estar logado." }, { status: 401 }); }
  const resposta = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken: tokenDeLogin }) }
  );
  if (!resposta.ok) { return NextResponse.json({ erro: "Login inválido ou vencido." }, { status: 401 }); }
  const email = (await resposta.json()).users?.[0]?.email?.toLowerCase();
  const administradores = (process.env.ADMIN_EMAILS ?? "").toLowerCase().split(",").map((item) => item.trim()).filter(Boolean);
  if (!email || !administradores.includes(email)) { return NextResponse.json({ erro: "Sem permissão." }, { status: 403 }); }
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
