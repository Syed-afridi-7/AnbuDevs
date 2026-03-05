import { CheckCircle2, XCircle, AlertTriangle, Clock, Terminal, X, Eye, EyeOff } from "lucide-react";
import type { RunResult, Verdict, TestCaseResult } from "@/data/codelabProblems";

interface OutputConsoleProps {
  result: RunResult | null;
  isRunning: boolean;
  onClose: () => void;
}

const verdictConfig: Record<Verdict, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Accepted:             { color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
  "Wrong Answer":       { color: "text-red-400",     bg: "bg-red-500/10",     icon: XCircle },
  "Runtime Error":      { color: "text-red-400",     bg: "bg-red-500/10",     icon: AlertTriangle },
  "Time Limit Exceeded":{ color: "text-yellow-400",  bg: "bg-yellow-500/10",  icon: Clock },
  "Compile Error":      { color: "text-red-400",     bg: "bg-red-500/10",     icon: AlertTriangle },
};

const VerdictBadge = ({ verdict }: { verdict: Verdict }) => {
  const cfg = verdictConfig[verdict];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {verdict}
    </span>
  );
};

const TestCaseRow = ({ result: r, index }: { result: TestCaseResult; index: number }) => {
  const isHidden = r.testCase.hidden;

  return (
    <tr className="border-t border-zinc-800/60 hover:bg-zinc-800/30 transition-colors">
      <td className="px-3 py-2.5 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          {isHidden ? (
            <EyeOff className="w-3 h-3 text-zinc-600" />
          ) : (
            <Eye className="w-3 h-3 text-zinc-600" />
          )}
          Case {index + 1}
          {isHidden && (
            <span className="text-[10px] text-zinc-600 font-medium">(Hidden)</span>
          )}
        </div>
      </td>
      <td className="px-3 py-2.5">
        <VerdictBadge verdict={r.verdict} />
      </td>
      <td className="px-3 py-2.5 text-xs text-zinc-400 font-mono">
        {isHidden ? "—" : r.testCase.input}
      </td>
      <td className="px-3 py-2.5 text-xs text-zinc-400 font-mono">
        {isHidden ? "—" : r.testCase.expected}
      </td>
      <td className="px-3 py-2.5 text-xs font-mono">
        <span className={r.passed ? "text-emerald-400" : "text-red-400"}>
          {isHidden && !r.passed ? "—" : r.output}
        </span>
      </td>
      <td className="px-3 py-2.5 text-xs text-zinc-500 font-mono">{r.runtime}</td>
      <td className="px-3 py-2.5 text-xs text-zinc-500 font-mono">{r.memory}</td>
    </tr>
  );
};

const OutputConsole = ({ result, isRunning, onClose }: OutputConsoleProps) => {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-t border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-300">Output</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-zinc-800 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        {/* Loading state */}
        {isRunning && (
          <div className="flex items-center justify-center h-full gap-3">
            <div className="w-5 h-5 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-sm text-zinc-400">Running code...</span>
          </div>
        )}

        {/* No result yet */}
        {!isRunning && !result && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-zinc-600">
              Run your code to see output here.
            </p>
          </div>
        )}

        {/* Results */}
        {!isRunning && result && (
          <div className="space-y-4">
            {/* Verdict banner */}
            <div
              className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                verdictConfig[result.verdict].bg
              }`}
            >
              <VerdictBadge verdict={result.verdict} />
              <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                <span>Runtime: <span className="text-zinc-200">{result.totalRuntime}</span></span>
                <span>Memory: <span className="text-zinc-200">{result.totalMemory}</span></span>
              </div>
            </div>

            {/* Stderr output */}
            {result.stderr && (
              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-3">
                <p className="text-xs font-semibold text-red-400 mb-1">stderr:</p>
                <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap">
                  {result.stderr}
                </pre>
              </div>
            )}

            {/* Stdout */}
            {result.stdout && (
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                <p className="text-xs font-semibold text-zinc-400 mb-1">stdout:</p>
                <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap">
                  {result.stdout}
                </pre>
              </div>
            )}

            {/* Test case results table */}
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-900/60">
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Test</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Input</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Expected</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Output</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Time</th>
                    <th className="px-3 py-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Memory</th>
                  </tr>
                </thead>
                <tbody>
                  {result.testCaseResults.map((r, i) => (
                    <TestCaseRow key={r.testCase.id} result={r} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputConsole;
