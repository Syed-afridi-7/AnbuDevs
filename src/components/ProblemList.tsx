import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Search, SlidersHorizontal, Shuffle, ChevronDown } from "lucide-react";
import { problems, topicTags, categoryTabs, type Difficulty } from "@/data/problems";
import DifficultyBadge from "@/components/DifficultyBadge";

const ProblemList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [showMoreTags, setShowMoreTags] = useState(false);

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const totalSolved = problems.filter((p) => p.solved).length;
  const visibleTags = showMoreTags ? topicTags : topicTags.slice(0, 7);

  return (
    <div className="max-w-4xl">
      {/* Topic tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {visibleTags.map((tag) => (
          <button
            key={tag.name}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {tag.name} <span className="text-muted-foreground/60">{tag.count}</span>
          </button>
        ))}
        <button
          onClick={() => setShowMoreTags(!showMoreTags)}
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-0.5"
        >
          {showMoreTags ? "Collapse" : "Expand"} <ChevronDown className={`w-3 h-3 transition-transform ${showMoreTags ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {categoryTabs.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat.name
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search & filters bar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions"
            className="w-full bg-secondary text-foreground text-xs rounded-md pl-8 pr-3 py-2 placeholder:text-muted-foreground/50 border border-border outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>

        <button className="p-2 rounded-md hover:bg-secondary transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-md hover:bg-secondary transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground rotate-90" />
        </button>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            <span className="text-foreground font-medium">{totalSolved}</span>/{problems.length} Solved
          </span>
          <button className="p-2 rounded-md hover:bg-secondary transition-colors">
            <Shuffle className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Difficulty filter */}
      <div className="flex items-center gap-2 mb-4">
        {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDifficulty(d)}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              selectedDifficulty === d
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Problem table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 w-10">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Title</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5 w-24">Acceptance</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 w-20">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem, idx) => (
              <tr
                key={problem.id}
                className={`border-t border-border hover:bg-[hsl(var(--row-hover))] transition-colors ${
                  idx % 2 === 0 ? "" : "bg-secondary/20"
                }`}
              >
                <td className="px-4 py-3">
                  {problem.solved && (
                    <Check className="w-4 h-4 text-easy" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/problems/${problem.id}`}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {problem.id}. {problem.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-xs text-muted-foreground">{problem.acceptance}%</span>
                </td>
                <td className="px-4 py-3">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemList;
