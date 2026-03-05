import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { RotateCcw } from "lucide-react";
import type { Language } from "@/data/codelabProblems";
import { langToMonaco } from "@/data/codelabProblems";

interface CodeEditorPanelProps {
  language: Language;
  code: string;
  defaultCode: string;
  onLanguageChange: (lang: Language) => void;
  onCodeChange: (code: string) => void;
  onReset: () => void;
}

const CodeEditorPanel = ({
  language,
  code,
  defaultCode,
  onLanguageChange,
  onCodeChange,
  onReset,
}: CodeEditorPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-zinc-800
                    bg-zinc-900/80"
      >
        <LanguageSelector value={language} onChange={onLanguageChange} />

        <button
          onClick={onReset}
          title="Reset to default code"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400
                     hover:text-zinc-200 hover:bg-zinc-800 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-orange-500/30"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={langToMonaco[language] || "plaintext"}
          value={code}
          onChange={(value) => onCodeChange(value || "")}
          theme="vs-dark"
          loading={
            <div className="flex items-center justify-center h-full bg-zinc-950">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-orange-500 rounded-full animate-spin" />
                Loading editor...
              </div>
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            wordWrap: "on",
            bracketPairColorization: { enabled: true },
            guides: { indentation: true, bracketPairs: true },
            suggest: { showKeywords: true, showSnippets: true },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorPanel;
