import { useState } from "react";
import "./App.css";
import FormBriefing from "./components/FormBriefing";
import SectionResult from "./components/SectionResult";
import { resultCopy } from "./services/gemini";
import CheckboxFiltro from "./components/CheckboxFiltro";

function App() {
  const [nameProject, setNameProject] = useState("");
  const [produto, setProduto] = useState("");
  const [publicoAlvo, setPublicoAlvo] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [tom, setTom] = useState("Autoridade e confiança");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState({
    titulo: "",
    subtitulo: "",
    cta: "",
    beneficios: "",
    depoimentos: "",
    rodape: "",
    ctasAlternativos: "",
  });

  const [selecionados, setSelecionados] = useState({
    titulo: true,
    subtitulo: true,
    cta: true,
    beneficios: true,
    depoimentos: true,
    rodape: true,
    ctasAlternativos: true,
  });

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Texto copiado!"))
      .catch((err) => console.error("Erro ao copiar:", err));
  };

  const handleInformation = async (onlySectionKey = null) => {
    if (!produto || !publicoAlvo || !objetivo || !beneficios) {
      setError("Preencha todos os campos antes de enviar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resultContent = await resultCopy({
        nameProject,
        produto,
        publico_alvo: publicoAlvo,
        objetivo,
        diferencial: beneficios,
        tom,
        variacao: Math.random().toString(36).substring(7), 
      });

      if (onlySectionKey) {
        setResult((prev) => ({
          ...prev,
          [onlySectionKey]: resultContent[onlySectionKey],
        }));
      } else {
        setResult(resultContent);
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao gerar o conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container-sections">
        <div className="form_briefing">
          <h1 className="landcopy-title">LandCopy</h1>
          <h2 className="landcopy-subtitle">Gerador de Textos para LandPages com IA</h2>

          <p className="landcopy-intro">
            Preencha o briefing com as informações do seu projeto e receba
            textos personalizados para a sua landing page em segundos, com base
            em inteligência artificial.
          </p>
          <FormBriefing
            as="input"
            value={nameProject}
            title_conteudo="Nome do seu Projeto"
            placeholder="Nome do seu produto, serviço [Não obrigatório]"
            onChange={(e) => setNameProject(e.target.value)}
          />
          <FormBriefing
            as="textarea"
            value={produto}
            title_conteudo="Produto ou serviço principal"
            placeholder="Descreva com detalhes sobre o serviço ou produto."
            onChange={(e) => setProduto(e.target.value)}
          />
          <FormBriefing
            as="input"
            value={publicoAlvo}
            title_conteudo="Público Alvo"
            placeholder="Ex: Empresários, estudantes, pais, mulheres"
            onChange={(e) => setPublicoAlvo(e.target.value)}
          />
          <FormBriefing
            as="textarea"
            value={objetivo}
            title_conteudo="Objetivo Final"
            placeholder="Captação de leads, venda direta, divulgação"
            onChange={(e) => setObjetivo(e.target.value)}
          />
          <FormBriefing
            as="textarea"
            value={beneficios}
            title_conteudo="Diferencial do seu produto ou serviço"
            placeholder="Destaque pontos positivos"
            onChange={(e) => setBeneficios(e.target.value)}
          />
          <FormBriefing
            title_conteudo="Escolha o estilo de comunicação"
            value={tom}
            onChange={(e) => setTom(e.target.value)}
            as="select"
            options={[
              "Aleatório",
              "Direto e objetivo",
              "Emocional e envolvente",
              "Engraçado e descontraído",
              "Autoridade e confiança",
              "Urgente e persuasivo",
              "Inspirador e motivacional",
              "Storytelling",
            ]}
          />

          <CheckboxFiltro onChangeSelecionados={setSelecionados} />

          <button
            className="button_send_information"
            onClick={() => handleInformation()}
            disabled={loading}>
            {loading ? "Analisando conteúdo..." : "Enviar Informações"}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        <SectionResult
          result={result}
          selecionados={selecionados}
          onGenerateAgain={handleInformation}
          onCopy={handleCopy}
          nomeProjeto={nameProject}
        />
      </div>
    </main>
  );
}

export default App;
