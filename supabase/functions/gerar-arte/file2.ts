type ProdutoInput = {
  nome: string;
  preco: number;
  descricao?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return Response.json(
      { erro: "Metodo nao permitido" },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const dados = await req.json();
    const nome = String(dados.nome ?? "").trim();
    const preco = Number(dados.preco);
    const descricao = String(dados.descricao ?? "").trim();

    if (!nome || !Number.isFinite(preco) || preco < 0) {
      return Response.json(
        { erro: "Informe nome e preco validos" },
        { status: 400, headers: corsHeaders }
      );
    }

    const valor = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const propaganda = {
      titulo: nome.toUpperCase(),
      preco: valor,
      descricao,
      chamada: "OFERTA ESPECIAL!",
      botao: "APROVEITE AGORA",
      tema: "roxo e azul neon",
    };

    return Response.json(
      { sucesso: true, propaganda },
      { headers: corsHeaders }
    );
  } catch {
    return Response.json(
      { erro: "Dados invalidos" },
      { status: 400, headers: corsHeaders }
    );
  }
});
