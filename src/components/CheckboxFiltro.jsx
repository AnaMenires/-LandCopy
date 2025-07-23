import React, { useState, useEffect } from "react";

const CheckboxFiltro = ({ onChangeSelecionados }) => {
  const tiposDisponiveis = [
    "titulo",
    "subtitulo",
    "beneficios",
    "depoimentos",
    "rodape",
    "ctasAlternativos",
  ];

  const [selecionados, setSelecionados] = useState(
    tiposDisponiveis.reduce((acc, tipo) => {
      acc[tipo] = true;
      return acc;
    }, {})
  );

  const toggleSelecionado = (tipo) => {
    const novosSelecionados = {
      ...selecionados,
      [tipo]: !selecionados[tipo],
    };
    setSelecionados(novosSelecionados);
    onChangeSelecionados?.(novosSelecionados);
  };

  useEffect(() => {
    onChangeSelecionados?.(selecionados);
  }, []);

  return (
    <div className="filter-checkboxes">
      <p><strong>Escolha o que deseja visualizar:</strong></p>
      <div className="checkbox-container">
        {tiposDisponiveis.map((tipo) => (
          <label key={tipo} className="checkbox-item">
            <input
              type="checkbox"
              checked={selecionados[tipo]}
              onChange={() => toggleSelecionado(tipo)}
            />
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFiltro;
