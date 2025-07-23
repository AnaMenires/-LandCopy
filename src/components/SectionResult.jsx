import { ArrowsClockwiseIcon, CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResultBox = ({ titulo, conteudo, onCopy, onGenerateAgain }) => {
  const [copied, setCopied] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(conteudo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  return (
  
    <div className="result">
      
      <div className="result-text">
        
        <p>
          <strong>{titulo}:</strong>
        </p>
        <pre>{conteudo}</pre>
      </div>

      <div className="icon-buttons">
        <div className="tooltip-wrapper" onClick={handleCopy}>
          <CopyIcon size={30} className="icon-btn copy" />
          <span className="tooltip">{copied ? "Copiado!" : "Copiar"}</span>
        </div>
        <div className="tooltip-wrapper" onClick={onGenerateAgain}>
          <ArrowsClockwiseIcon size={30} className="icon-btn generate-again" />
          <span className="tooltip">Gerar Outro</span>
        </div>
      </div>
    </div>
  );
};

const SectionResult = ({ result, selecionados, onGenerateAgain, onCopy, nomeProjeto }) => {
  const handleDownloadPDF = async () => {
    const input = document.getElementById("result-section");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const title = nomeProjeto || "Landing Page";
    const pageWidth = pdf.internal.pageSize.getWidth();
  const textWidth = pdf.getTextWidth(title);
  const x = (pageWidth - textWidth) / 2;
  pdf.setFontSize(18);
  pdf.text(title, x, 20);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 30, pdfWidth, pdfHeight);
    pdf.save(`${title}.pdf`);
  };

  return (
    <section className="results">
      <div id="result-section">
        <h2 className="result-title">Resultado Gerado</h2> 
        {Object.entries(result)
          .filter(([key]) => selecionados?.[key])
          .map(([key, value]) => (
            <ResultBox
              key={key}
              titulo={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              conteudo={value}
              onCopy={() => onCopy(value)}
              onGenerateAgain={() => onGenerateAgain(key)}
            />
          ))}
      </div>

      <button className="button_download_pdf" onClick={handleDownloadPDF}>
        <DownloadSimpleIcon size={22} style={{ marginRight: "8px" }} />
        Baixar PDF
      </button>
    </section>
  );
};

export default SectionResult;
