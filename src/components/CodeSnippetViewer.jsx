import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "./style/code.css";
import Typewriterthis from './typerwhriteEffect/typewhrite'
function CodeSnippetViewer() {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("editorTheme") || "dark");
  const [lineCount, setLineCount] = useState(1);
  const [charCount, setCharCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  
  const GithubLink = [
    "https://github.com/Apoloundifinied",
  ]
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  // Sincroniza código e conta linhas/caracteres
  useEffect(() => {
  setCharCount(code.length);

  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    const style = window.getComputedStyle(textareaRef.current);
    let lineHeight = parseFloat(style.lineHeight);
    if (isNaN(lineHeight) || lineHeight === 0) {
      lineHeight = parseFloat(style.fontSize) * 1.5;
    }

    const totalVisualLines = Math.round(textareaRef.current.scrollHeight / lineHeight);

    // Use totalVisualLines, pois conta as linhas visuais no textarea
    setLineCount(Math.max(totalVisualLines, 1));
  }

  if (preRef.current) {
    preRef.current.innerHTML = Prism.highlight(
      code,
      Prism.languages.javascript,
      "javascript"
    );
    preRef.current.style.height = textareaRef.current.style.height;
  }
}, [code]);



  // Aplica tema no body para evitar flash e manter o tema consistente
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("editorTheme", newTheme);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      alert("Erro ao copiar o código.");
    }
  };

  return (
    

    <div className={`app-container ${theme}`}>
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="editor-container"
      >
        <header className="editor-header">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="editor-title"
          >
            <Typewriterthis/>
          </motion.h2>
          <div className="editor-controls">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyCode}
              className="control-button"
              aria-label="Copiar código para área de transferência"
            >
              {isCopied ? "Copiado!" : "Copiar"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="control-button"
              aria-label="Alternar tema claro/escuro"
            >
              {theme === "dark" ? "Tema Claro" : "Tema Escuro"}
            </motion.button>
          </div>
        </header>

        <main className="editor-content">
          <div className="line-numbers" aria-hidden="true">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="line-number">
                {i + 1}
              </div>
            ))}
          </div>

          <div className="code-wrapper" style={{ position: "relative" }}>
            {/* <pre> syntax highlighted, não interativo */}
            <pre
              ref={preRef}
              className="code-highlight"
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                pointerEvents: "none",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                width: "100%",
                height: "auto",
                minHeight: "100px",
                padding: "1rem",
                borderRadius: "6px",
                fontSize: "1rem",
                lineHeight: "1.5",
                boxSizing: "border-box",
                color: theme === "dark" ? "#f8f8f2" : "#333",
              }}
            />

            {/* Textarea transparente para edição */}
            <AnimatePresence>
              <motion.textarea
                wrap="soft"
                key="code-editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Escreva seu código aqui..."
                className="code-textarea"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                style={{
                  position: "relative",
                  background: "transparent",
                  color: theme === "dark" ? "#f8f8f2" : "#333",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  width: "100%",
                  minHeight: "100px",
                  padding: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </AnimatePresence>
          </div>
        </main>

        <footer className="editor-footer">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Linhas: {lineCount} | Caracteres: {charCount}
          </motion.span>
        </footer>
      </motion.section>
    </div>
  );
}

export default CodeSnippetViewer;
