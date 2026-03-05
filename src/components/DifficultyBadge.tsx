import { type Difficulty } from "@/data/problems";

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  const colorClass = {
    Easy: "text-easy",
    Medium: "text-medium",
    Hard: "text-hard",
  }[difficulty];

  return <span className={`text-xs font-medium ${colorClass}`}>{difficulty}</span>;
};

export default DifficultyBadge;
