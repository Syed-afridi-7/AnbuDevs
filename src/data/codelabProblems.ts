// ── Types ────────────────────────────────────────────────────────────────────

export type Verdict =
  | "Accepted"
  | "Wrong Answer"
  | "Runtime Error"
  | "Time Limit Exceeded"
  | "Compile Error";

export type Language = "Python" | "Java" | "C++" | "JavaScript" | "C";

export interface TestCase {
  id: number;
  input: string;
  expected: string;
  hidden: boolean;
}

export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  verdict: Verdict;
  output: string;
  runtime: string;
  memory: string;
}

export interface RunResult {
  verdict: Verdict;
  testCaseResults: TestCaseResult[];
  totalRuntime: string;
  totalMemory: string;
  stdout: string;
  stderr: string;
}

export interface CodeLabProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  testCases: TestCase[];
  followUp?: string;
  hint?: string;
  starterCode: Record<Language, string>;
}

// ── Monaco language map ──────────────────────────────────────────────────────

export const langToMonaco: Record<Language, string> = {
  Python: "python",
  Java: "java",
  "C++": "cpp",
  JavaScript: "javascript",
  C: "c",
};

export const LANGUAGES: Language[] = ["Python", "Java", "C++", "JavaScript", "C"];

// ── Sample problem: Two Sum ──────────────────────────────────────────────────

export const twoSumProblem: CodeLabProblem = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
    },
  ],
  testCases: [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      expected: "[0,1]",
      hidden: false,
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      expected: "[1,2]",
      hidden: false,
    },
    {
      id: 3,
      input: "nums = [3,3], target = 6",
      expected: "[0,1]",
      hidden: true,
    },
  ],
  followUp:
    "Can you come up with an algorithm that is less than O(n²) time complexity?",
  hint:
    "A hash map can reduce the lookup time from O(n) to O(1) by trading space for speed. Think about what value you need to find for each element.",
  starterCode: {
    Python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        pass`,
    Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    "C++": `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
    JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
    C: `#include <stdlib.h>

/**
 * Return an array of size *returnSize.
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    return result;
}`,
  },
};

// ── Mock execution helper ────────────────────────────────────────────────────

const VERDICTS: Verdict[] = [
  "Accepted",
  "Wrong Answer",
  "Runtime Error",
  "Time Limit Exceeded",
  "Compile Error",
];

/** Simulate running code against test cases with a random outcome */
export function simulateRun(
  testCases: TestCase[],
  isSubmit: boolean
): RunResult {
  const casesToRun = isSubmit
    ? testCases
    : testCases.filter((tc) => !tc.hidden);

  // ~60% chance of Accepted for each visible test case on Run
  // On Submit, hidden test case has ~40% chance of failing
  const testCaseResults: TestCaseResult[] = casesToRun.map((tc) => {
    const rand = Math.random();
    const passChance = tc.hidden ? 0.4 : 0.6;
    const passed = rand < passChance;
    const verdict: Verdict = passed
      ? "Accepted"
      : VERDICTS[Math.floor(Math.random() * 4) + 1]; // skip Accepted index

    const runtime = `${Math.floor(Math.random() * 60) + 1}ms`;
    const memory = `${(Math.random() * 10 + 14).toFixed(1)} MB`;

    return {
      testCase: tc,
      passed,
      verdict,
      output: passed ? tc.expected : `[${Math.floor(Math.random() * 4)},${Math.floor(Math.random() * 4)}]`,
      runtime,
      memory,
    };
  });

  const allPassed = testCaseResults.every((r) => r.passed);
  const firstFail = testCaseResults.find((r) => !r.passed);
  const overallVerdict: Verdict = allPassed
    ? "Accepted"
    : firstFail?.verdict ?? "Wrong Answer";

  const totalRuntime = `${Math.floor(Math.random() * 80) + 4}ms`;
  const totalMemory = `${(Math.random() * 8 + 16).toFixed(1)} MB`;

  return {
    verdict: overallVerdict,
    testCaseResults,
    totalRuntime,
    totalMemory,
    stdout: allPassed ? "All test cases passed." : "",
    stderr: overallVerdict === "Compile Error" ? "SyntaxError: unexpected token" : "",
  };
}
