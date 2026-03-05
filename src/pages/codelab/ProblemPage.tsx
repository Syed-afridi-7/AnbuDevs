import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Send,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  Code2,
  LayoutDashboard,
  Brain,
  MessageSquare,
  Briefcase,
  FlaskConical,
} from "lucide-react";
import ProblemDescription from "@/components/codelab/ProblemDescription";
import CodeEditorPanel from "@/components/codelab/CodeEditorPanel";
import OutputConsole from "@/components/codelab/OutputConsole";
import type { Language, RunResult, Verdict } from "@/data/codelabProblems";
import { twoSumProblem, simulateRun } from "@/data/codelabProblems";

// ── Sidebar nav items ────────────────────────────────────────────────────────

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FlaskConical,    label: "Code Lab",  path: "/codelab",  active: true },
  { icon: Brain,           label: "Aptitude Hub", path: "/aptitude" },
  { icon: MessageSquare,   label: "Communication", path: "/communication" },
  { icon: Briefcase,       label: "Role-Based Paths", path: "/paths" },
];

// ── Main component ───────────────────────────────────────────────────────────

const ProblemPage = () => {
  const problem = twoSumProblem;

  // Editor state
  const [language, setLanguage] = useState<Language>("Python");
  const [code, setCode] = useState(problem.starterCode["Python"]);

  // Console state
  const [showConsole, setShowConsole] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [lastAction, setLastAction] = useState<"run" | "submit" | null>(null);

  // Custom test case toggle
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState("");

  // Language switch → swap boilerplate
  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      setCode(problem.starterCode[lang]);
    },
    [problem.starterCode]
  );

  // Reset code
  const handleReset = useCallback(() => {
    setCode(problem.starterCode[language]);
  }, [language, problem.starterCode]);

  // Mock run/submit execution
  const executeCode = useCallback(
    (isSubmit: boolean) => {
      setShowConsole(true);
      setIsRunning(true);
      setRunResult(null);
      setLastAction(isSubmit ? "submit" : "run");

      const delay = Math.random() * 1000 + 800; // 800–1800ms
      setTimeout(() => {
        const result = simulateRun(problem.testCases, isSubmit);
        setRunResult(result);
        setIsRunning(false);
      }, delay);
    },
    [problem.testCases]
  );

  // Verdict banner styles
  const verdictBannerColor: Record<Verdict, string> = {
    Accepted: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    "Wrong Answer": "bg-red-500/15 border-red-500/30 text-red-400",
    "Runtime Error": "bg-red-500/15 border-red-500/30 text-red-400",
    "Time Limit Exceeded": "bg-yellow-500/15 border-yellow-500/30 text-yellow-400",
    "Compile Error": "bg-red-500/15 border-red-500/30 text-red-400",
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* ── Fixed Sidebar (18rem / 288px) ── */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-zinc-900 border-r border-zinc-800">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-800">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-100 tracking-tight">SkillForge</h1>
            <p className="text-[10px] text-zinc-500 font-medium">2.0</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${
                  item.active
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                }`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Back link */}
        <div className="px-3 pb-4">
          <Link
            to="/problemset"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-zinc-500
                       hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Problems
          </Link>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header (lg and below) */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-zinc-100">SkillForge</span>
          <Link to="/problemset" className="ml-auto text-xs text-zinc-500 hover:text-zinc-300">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Split panels */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* ── Left panel: Problem Description (~42%) ── */}
          <div
            className="w-full lg:w-[42%] border-b lg:border-b-0 lg:border-r border-zinc-800
                        flex flex-col min-h-[300px] lg:min-h-0"
          >
            <ProblemDescription problem={problem} />
          </div>

          {/* ── Right panel: Editor + Console (~58%) ── */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Editor area */}
            <div className={`flex-1 min-h-0 ${showConsole ? "h-[65%]" : "h-full"}`}>
              <CodeEditorPanel
                language={language}
                code={code}
                defaultCode={problem.starterCode[language]}
                onLanguageChange={handleLanguageChange}
                onCodeChange={setCode}
                onReset={handleReset}
              />
            </div>

            {/* Console area (~30-35% height when open) */}
            {showConsole && (
              <div className="h-[35%] min-h-[200px]">
                <OutputConsole
                  result={runResult}
                  isRunning={isRunning}
                  onClose={() => setShowConsole(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Verdict banner (shown after run/submit) ── */}
        {runResult && !isRunning && (
          <div
            className={`px-6 py-2.5 border-t text-center text-sm font-semibold
                        ${verdictBannerColor[runResult.verdict]} border-current/20`}
          >
            {lastAction === "submit" ? "Submission" : "Run"} Result:{" "}
            {runResult.verdict}
            {runResult.verdict === "Accepted" && " — All test cases passed!"}
          </div>
        )}

        {/* ── Bottom action bar ── */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-t border-zinc-800
                      shrink-0"
        >
          {/* Left: Console toggle + custom testcase */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConsole(!showConsole)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400
                         hover:text-zinc-200 hover:bg-zinc-800 transition-colors
                         border border-zinc-800"
            >
              Console
              {showConsole ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>

            <button
              onClick={() => setUseCustomInput(!useCustomInput)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors
                         border ${
                           useCustomInput
                             ? "border-orange-500/30 text-orange-400 bg-orange-500/10"
                             : "border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                         }`}
            >
              Custom Input
            </button>
          </div>

          {/* Right: Run + Submit buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => executeCode(false)}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-medium
                         bg-zinc-800 text-zinc-200 border border-zinc-700
                         hover:bg-zinc-700 hover:border-zinc-600
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            >
              <Play className="w-3.5 h-3.5" />
              Run Code
            </button>

            <button
              onClick={() => executeCode(true)}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold
                         bg-orange-500 text-white
                         hover:bg-orange-400
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors shadow-lg shadow-orange-500/20
                         focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            >
              <Send className="w-3.5 h-3.5" />
              Submit
            </button>
          </div>
        </div>

        {/* Custom input panel (inline, appears above bottom bar) */}
        {useCustomInput && (
          <div className="px-4 pb-3 bg-zinc-900 border-t border-zinc-800/50">
            <label className="text-xs text-zinc-500 font-medium mb-1.5 block">
              Custom Test Input
            </label>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="nums = [1,2,3], target = 4"
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5
                         text-sm font-mono text-zinc-300 placeholder-zinc-600
                         focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40
                         resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPage;
