export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  id: number;
  title: string;
  acceptance: number;
  difficulty: Difficulty;
  tags: string[];
  solved?: boolean;
};

export const problems: Problem[] = [
  { id: 1, title: "Two Sum", acceptance: 57.1, difficulty: "Easy", tags: ["Array", "Hash Table"], solved: true },
  { id: 2, title: "Add Two Numbers", acceptance: 48.0, difficulty: "Medium", tags: ["Linked List", "Math"] },
  { id: 3, title: "Longest Substring Without Repeating Characters", acceptance: 38.6, difficulty: "Medium", tags: ["String", "Sliding Window"] },
  { id: 4, title: "Median of Two Sorted Arrays", acceptance: 46.0, difficulty: "Hard", tags: ["Array", "Binary Search"] },
  { id: 5, title: "Longest Palindromic Substring", acceptance: 37.4, difficulty: "Medium", tags: ["String", "Dynamic Programming"] },
  { id: 6, title: "Zigzag Conversion", acceptance: 53.6, difficulty: "Medium", tags: ["String"] },
  { id: 7, title: "Reverse Integer", acceptance: 31.6, difficulty: "Medium", tags: ["Math"] },
  { id: 8, title: "String to Integer (atoi)", acceptance: 20.6, difficulty: "Medium", tags: ["String"] },
  { id: 9, title: "Palindrome Number", acceptance: 60.3, difficulty: "Easy", tags: ["Math"], solved: true },
  { id: 10, title: "Regular Expression Matching", acceptance: 30.5, difficulty: "Hard", tags: ["String", "Dynamic Programming"] },
  { id: 11, title: "Container With Most Water", acceptance: 59.6, difficulty: "Medium", tags: ["Array", "Two Pointers", "Greedy"] },
  { id: 12, title: "Integer to Roman", acceptance: 70.5, difficulty: "Medium", tags: ["Math", "String"] },
  { id: 13, title: "Roman to Integer", acceptance: 66.3, difficulty: "Easy", tags: ["Math", "String"] },
  { id: 14, title: "Longest Common Prefix", acceptance: 44.5, difficulty: "Easy", tags: ["String"] },
  { id: 15, title: "3Sum", acceptance: 36.5, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 16, title: "3Sum Closest", acceptance: 45.8, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 17, title: "Letter Combinations of a Phone Number", acceptance: 62.8, difficulty: "Medium", tags: ["String", "Backtracking"] },
  { id: 18, title: "4Sum", acceptance: 38.9, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 19, title: "Remove Nth Node From End of List", acceptance: 47.2, difficulty: "Medium", tags: ["Linked List", "Two Pointers"] },
  { id: 20, title: "Valid Parentheses", acceptance: 41.2, difficulty: "Easy", tags: ["String", "Stack"], solved: true },
  { id: 21, title: "Merge Two Sorted Lists", acceptance: 66.0, difficulty: "Easy", tags: ["Linked List"] },
  { id: 22, title: "Generate Parentheses", acceptance: 76.0, difficulty: "Medium", tags: ["String", "Backtracking"] },
  { id: 23, title: "Merge k Sorted Lists", acceptance: 55.2, difficulty: "Hard", tags: ["Linked List", "Heap"] },
  { id: 24, title: "Swap Nodes in Pairs", acceptance: 66.1, difficulty: "Medium", tags: ["Linked List"] },
  { id: 25, title: "Reverse Nodes in k-Group", acceptance: 60.7, difficulty: "Hard", tags: ["Linked List"] },
];

export const topicTags = [
  { name: "Array", count: 2115 },
  { name: "String", count: 859 },
  { name: "Hash Table", count: 795 },
  { name: "Math", count: 654 },
  { name: "Dynamic Programming", count: 645 },
  { name: "Sorting", count: 509 },
  { name: "Greedy", count: 455 },
  { name: "Depth-First Search", count: 336 },
  { name: "Binary Search", count: 320 },
  { name: "Tree", count: 298 },
  { name: "Two Pointers", count: 276 },
  { name: "Stack", count: 245 },
];

export const categoryTabs = [
  { name: "All Topics", icon: "grid" },
  { name: "Algorithms", icon: "brain" },
  { name: "Database", icon: "database" },
  { name: "Shell", icon: "terminal" },
  { name: "Concurrency", icon: "layers" },
  { name: "JavaScript", icon: "code" },
];

export const problemDetails: Record<number, { description: string; examples: { input: string; output: string; explanation?: string }[]; constraints: string[] }> = {
  1: {
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
  },
};
