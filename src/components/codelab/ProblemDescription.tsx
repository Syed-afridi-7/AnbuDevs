import { useState } from "react";
import { ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import type { CodeLabProblem } from "@/data/codelabProblems";

interface ProblemDescriptionProps {
  problem: CodeLabProblem;
}

// Simple inline markdown renderer for bold, code, and line breaks
function renderMarkdown(text: string) {
  const parts = text.split("\n\n");
  return parts.map((paragraph, i) => {
    // Process inline markdown: **bold** and `code`
    const processed = paragraph
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100 font-semibold">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-orange-400 text-xs font-mono">$1</code>');

    return (
      <p
        key={i}
        className="mb-3 last:mb-0"
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  });
}

const difficultyStyles = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  const [showHint, setShowHint] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6">
        {/* Title + difficulty + tags */}
        <h1 className="text-xl font-bold text-zinc-100 mb-3">
          {problem.id}. {problem.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              difficultyStyles[problem.difficulty]
            }`}
          >
            {problem.difficulty}
          </span>
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium
                         bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="text-sm text-zinc-300 leading-relaxed mb-6">
          {renderMarkdown(problem.description)}
        </div>

        {/* Examples */}
        <div className="space-y-4 mb-6">
          {problem.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4"
            >
              <p className="text-xs font-semibold text-zinc-300 mb-3">
                Example {i + 1}:
              </p>
              <div className="font-mono text-xs space-y-1.5">
                <p>
                  <span className="text-zinc-500">Input: </span>
                  <span className="text-zinc-200">{ex.input}</span>
                </p>
                <p>
                  <span className="text-zinc-500">Output: </span>
                  <span className="text-zinc-200">{ex.output}</span>
                </p>
                {ex.explanation && (
                  <p className="pt-1">
                    <span className="text-zinc-500">Explanation: </span>
                    <span className="text-zinc-400">{ex.explanation}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-zinc-300 mb-2">
            Constraints:
          </p>
          <ul className="space-y-1">
            {problem.constraints.map((c, i) => (
              <li
                key={i}
                className="text-xs text-zinc-400 font-mono flex items-start gap-2"
              >
                <span className="text-zinc-600 mt-0.5">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Follow-up accordion */}
        {problem.followUp && (
          <div className="mb-3">
            <button
              onClick={() => setShowFollowUp(!showFollowUp)}
              className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl
                         bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700
                         transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-sm font-medium text-zinc-300 flex-1">
                Follow-up
              </span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-500 transition-transform ${
                  showFollowUp ? "rotate-180" : ""
                }`}
              />
            </button>
            {showFollowUp && (
              <div className="px-4 py-3 text-sm text-zinc-400 leading-relaxed">
                {problem.followUp}
              </div>
            )}
          </div>
        )}

        {/* Hint accordion */}
        {problem.hint && (
          <div className="mb-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl
                         bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700
                         transition-colors group"
            >
              <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-sm font-medium text-zinc-300 flex-1">
                Hint
              </span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-500 transition-transform ${
                  showHint ? "rotate-180" : ""
                }`}
              />
            </button>
            {showHint && (
              <div className="px-4 py-3 text-sm text-zinc-400 leading-relaxed">
                {problem.hint}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
