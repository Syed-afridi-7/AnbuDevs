import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ThumbsDown, Bookmark, Share2, Play, Send, ChevronLeft, ChevronRight } from "lucide-react";
import Editor from "@monaco-editor/react";
import Navbar from "@/components/Navbar";
import DifficultyBadge from "@/components/DifficultyBadge";
import { problems, problemDetails } from "@/data/problems";

const LANGUAGES = ["Python3", "JavaScript", "TypeScript", "Java", "C++", "Go"] as const;

const langToMonaco: Record<string, string> = {
  Python3: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Java: "java",
  "C++": "cpp",
  Go: "go",
};

const ProblemDetail = () => {
  const { id } = useParams();
  const problemIndex = problems.findIndex((p) => p.id === Number(id));
  const problem = problems[problemIndex];
  const details = problemDetails[Number(id)];

  const [language, setLanguage] = useState<string>("Python3");
  const [code, setCode] = useState<string>(details?.starterCode?.["Python3"] || "# Write your solution here");
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "editorial" | "solutions">("description");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (details?.starterCode?.[lang]) {
      setCode(details.starterCode[lang]);
    } else {
      setCode("// Write your solution here");
    }
  };

  const handleRun = () => {
    setShowConsole(true);
    setConsoleOutput("Accepted\n\nRuntime: 4ms (Beats 95.2%)\nMemory: 17.8 MB (Beats 68.4%)");
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-48px)]">
          <p className="text-muted-foreground">Problem not found</p>
        </div>
      </div>
    );
  }

  const prevProblem = problemIndex > 0 ? problems[problemIndex - 1] : null;
  const nextProblem = problemIndex < problems.length - 1 ? problems[problemIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-48px)]">
        {/* Problem description panel */}
        <div className="w-1/2 border-r border-border overflow-y-auto flex flex-col">
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <Link to="/problemset" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to problems
              </Link>
              <div className="flex items-center gap-1">
                {prevProblem && (
                  <Link to={`/problems/${prevProblem.id}`} className="p-1.5 rounded hover:bg-secondary transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                )}
                {nextProblem && (
                  <Link to={`/problems/${nextProblem.id}`} className="p-1.5 rounded hover:bg-secondary transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-5 border-b border-border">
              {(["description", "editorial", "solutions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 text-xs font-medium capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <>
                <h1 className="text-xl font-semibold text-foreground mb-2">
                  {problem.id}. {problem.title}
                </h1>

                <div className="flex items-center gap-3 mb-5">
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <div className="flex items-center gap-2">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="bg-tag text-tag-foreground text-[10px] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {details ? (
                  <>
                    <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line mb-6">
                      {details.description}
                    </div>

                    <div className="space-y-4 mb-6">
                      {details.examples.map((ex, i) => (
                        <div key={i} className="bg-secondary rounded-lg p-4">
                          <p className="text-xs font-semibold text-foreground mb-2">Example {i + 1}:</p>
                          <div className="font-mono text-xs space-y-1">
                            <p><span className="text-muted-foreground">Input:</span> <span className="text-foreground">{ex.input}</span></p>
                            <p><span className="text-muted-foreground">Output:</span> <span className="text-foreground">{ex.output}</span></p>
                            {ex.explanation && (
                              <p><span className="text-muted-foreground">Explanation:</span> <span className="text-foreground">{ex.explanation}</span></p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-foreground mb-2">Constraints:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {details.constraints.map((c, i) => (
                          <li key={i} className="text-xs text-muted-foreground font-mono">{c}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Problem description coming soon...</p>
                )}
              </>
            )}

            {activeTab === "editorial" && (
              <div className="text-sm text-muted-foreground py-8 text-center">
                <p>Editorial coming soon...</p>
                <p className="text-xs mt-2">Subscribe to Premium for full editorials.</p>
              </div>
            )}

            {activeTab === "solutions" && (
              <div className="text-sm text-muted-foreground py-8 text-center">
                <p>Community solutions coming soon...</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 px-6 py-3 border-t border-border">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" /> Like
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" /> Dislike
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Bookmark className="w-3.5 h-3.5" /> Save
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Code editor panel */}
        <div className="w-1/2 flex flex-col">
          {/* Language selector */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-xs bg-transparent text-foreground outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={langToMonaco[language] || "plaintext"}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                padding: { top: 12 },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
              }}
            />
          </div>

          {/* Console output */}
          {showConsole && (
            <div className="h-36 border-t border-border bg-card overflow-auto p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">Console</span>
                <button onClick={() => setShowConsole(false)} className="text-xs text-muted-foreground hover:text-foreground">×</button>
              </div>
              <pre className="font-mono text-xs text-easy whitespace-pre-wrap">{consoleOutput}</pre>
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-secondary/50">
            <button
              onClick={() => setShowConsole(!showConsole)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Console
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                className="inline-flex items-center gap-1.5 text-xs px-4 py-1.5 rounded bg-secondary hover:bg-accent text-foreground border border-border transition-colors"
              >
                <Play className="w-3 h-3" /> Run
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs px-4 py-1.5 rounded bg-easy text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                <Send className="w-3 h-3" /> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
