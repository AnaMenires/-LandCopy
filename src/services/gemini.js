import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

function extractSection(text, section) {
  const regex = new RegExp(`::${section}::\\s*([\\s\\S]*?)(?=::|$)`, "i");
  const result = text.match(regex)?.[1]?.trim() ?? "";
  return result.replace(/[*_]{1,2}/g, "");
}

export async function resultCopy({
  produto,
  publico_alvo,
  objetivo,
  diferencial,
  tom,
  nameProject,
  variacao,
}) {
  const prompt = `
Você é um especialista em copywriting. Gere uma landing page com base nas informações abaixo.

Use a estrutura delimitada por seções como neste exemplo (sem formatação Markdown):

::titulo::
Seu título chamativo

::subtitulo::
Subtítulo explicativo e atrativo

::cta::
Chamada principal

::beneficios::
- Benefício 1
- Benefício 2

::depoimentos::
- Depoimento 1
- Depoimento 2

::rodape::
Mensagem final

::ctasalternativos::
- Alternativa 1
- Alternativa 2

Geração aleatória: ${variacao}

Produto: ${produto}
Público-alvo: ${publico_alvo}
Objetivo: ${objetivo}
Diferencial: ${diferencial}
Tom: ${tom}
Nome do projeto: ${nameProject}
`;

  try {
    const model = geminiClient.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = await response.text();

    const parsedResult = {
      titulo: extractSection(rawText, "titulo"),
      subtitulo: extractSection(rawText, "subtitulo"),
      cta: extractSection(rawText, "cta"),
      beneficios: extractSection(rawText, "beneficios"),
      depoimentos: extractSection(rawText, "depoimentos"),
      rodape: extractSection(rawText, "rodape"),
      ctasAlternativos: extractSection(rawText, "ctasalternativos"),
    };

    return parsedResult;
  } catch (error) {
    console.error("Erro ao buscar informações:", error);
    throw new Error(
      "Erro ao conectar com a IA. Verifique sua chave de API e tente novamente."
    );
  }
}
