import { useState } from "react";

const Output = ({ gameCodes }) => {
  const [copied, setCopied] = useState(false);

  const copyCodesToClipboard = async () => {
    const codesString = gameCodes.join("\n");
    await navigator.clipboard.writeText(codesString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copySingleCode = async (code) => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="generator__output">
      <div className="generator__title-wrapper">
        {/* NEW: count badge */}
        <h2 className="generator__output-title">
          Game codes{" "}
          {gameCodes.length > 0 && (
            <span className="generator__code-count">({gameCodes.length})</span>
          )}
        </h2>
        {gameCodes.length > 0 && (
          <button
            className="generator__copy-button"
            onClick={copyCodesToClipboard}
          >
            {copied ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>
      {gameCodes.length > 0 ? (
        <ul className="generator__codes-list">
          {gameCodes.map((code, index) => (
            <li key={index} className="generator__code-item">
              {code}
              <button
                className="generator__copy-single"
                onClick={() => copySingleCode(code)}
                title="Copy code"
              >
                ⎘
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="generator__code-item--placeholder">
          Game codes will be generated here
        </p>
      )}
    </div>
  );
};

export default Output;
