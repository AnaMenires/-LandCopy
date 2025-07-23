import React from "react";

const FormBriefing = ({
  title_conteudo,
  placeholder,
  value,
  as = "input",
  options = [],
  onChange,
}) => {
  const isSelect = as === "select";
  const Component = isSelect ? "select" : as === "textarea" ? "textarea" : "input";

  return (
    <form className="form">
      <h2 className="subtitulos">{title_conteudo}</h2>
      <label className="label">
        {isSelect ? (
          <select
            className="input"
            value={value}
            onChange={onChange}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <Component
            className="input"
            type={as === "textarea" ? undefined : "text"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}

        
      </label>
    </form>
    
  );
};

export default FormBriefing;
