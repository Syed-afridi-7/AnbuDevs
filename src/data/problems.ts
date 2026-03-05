// SkillForge 2.0 - Problem Data Model
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  acceptance: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: { [lang: string]: string };
  solved?: boolean;
}

export const problems: Problem[] = [
  // ========== EASY ==========
  {
    id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays",
    tags: ["Array", "Hash Table"], acceptance: 51.2, solved: true,
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    starterCode: {
      python: "def twoSum(nums, target):\n    # Write your solution\n    pass",
      javascript: "function twoSum(nums, target) {\n    // Write your solution\n}",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution\n    }\n};",
      c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution\n}",
    }
  },
  {
    id: 2, title: "Reverse String", difficulty: "Easy", category: "Strings",
    tags: ["String", "Two Pointers"], acceptance: 76.4, solved: true,
    description: "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    constraints: ["1 <= s.length <= 10^5"],
    starterCode: {
      python: "def reverseString(s):\n    pass",
      javascript: "function reverseString(s) {\n}",
      java: "class Solution {\n    public void reverseString(char[] s) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n    }\n};",
      c: "void reverseString(char* s, int sSize) {\n}",
    }
  },
  {
    id: 3, title: "Valid Parentheses", difficulty: "Easy", category: "Stacks",
    tags: ["Stack", "String"], acceptance: 40.7, solved: true,
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets must be closed by the same type, and in the correct order.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4"],
    starterCode: {
      python: "def isValid(s):\n    pass",
      javascript: "function isValid(s) {\n}",
      java: "class Solution {\n    public boolean isValid(String s) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n    }\n};",
      c: "bool isValid(char* s) {\n}",
    }
  },
  {
    id: 4, title: "Maximum Depth of Binary Tree", difficulty: "Easy", category: "Trees",
    tags: ["Tree", "DFS", "BFS"], acceptance: 74.5, solved: true,
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["Number of nodes in range [0, 10^4]", "-100 <= Node.val <= 100"],
    starterCode: {
      python: "def maxDepth(root):\n    pass",
      javascript: "function maxDepth(root) {\n}",
      java: "class Solution {\n    public int maxDepth(TreeNode root) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n    }\n};",
      c: "int maxDepth(struct TreeNode* root) {\n}",
    }
  },
  {
    id: 5, title: "Merge Sorted Array", difficulty: "Easy", category: "Arrays",
    tags: ["Array", "Two Pointers", "Sorting"], acceptance: 47.8,
    description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and integers `m` and `n`. Merge `nums1` and `nums2` into a single sorted array.",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
    ],
    constraints: ["nums1.length == m + n", "0 <= m, n <= 200"],
    starterCode: {
      python: "def merge(nums1, m, nums2, n):\n    pass",
      javascript: "function merge(nums1, m, nums2, n) {\n}",
      java: "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    }\n};",
      c: "void merge(int* nums1, int m, int* nums2, int n) {\n}",
    }
  },
  {
    id: 6, title: "Palindrome Number", difficulty: "Easy", category: "Math",
    tags: ["Math"], acceptance: 54.3,
    description: "Given an integer `x`, return true if `x` is a palindrome, and false otherwise.",
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and right to left." },
      { input: "x = -121", output: "false" },
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    starterCode: {
      python: "def isPalindrome(x):\n    pass",
      javascript: "function isPalindrome(x) {\n}",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isPalindrome(int x) {\n    }\n};",
      c: "bool isPalindrome(int x) {\n}",
    }
  },
  {
    id: 7, title: "Single Number", difficulty: "Easy", category: "Arrays",
    tags: ["Array", "Bit Manipulation"], acceptance: 72.1,
    description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single element.",
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    starterCode: {
      python: "def singleNumber(nums):\n    pass",
      javascript: "function singleNumber(nums) {\n}",
      java: "class Solution {\n    public int singleNumber(int[] nums) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n    }\n};",
      c: "int singleNumber(int* nums, int numsSize) {\n}",
    }
  },
  {
    id: 8, title: "Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming",
    tags: ["Math", "DP", "Memoization"], acceptance: 51.9,
    description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "Two ways: 1+1, 2" },
      { input: "n = 3", output: "3", explanation: "Three ways: 1+1+1, 1+2, 2+1" },
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      python: "def climbStairs(n):\n    pass",
      javascript: "function climbStairs(n) {\n}",
      java: "class Solution {\n    public int climbStairs(int n) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n    }\n};",
      c: "int climbStairs(int n) {\n}",
    }
  },
  // ========== MEDIUM ==========
  {
    id: 101, title: "Add Two Numbers", difficulty: "Medium", category: "Linked Lists",
    tags: ["Linked List", "Math", "Recursion"], acceptance: 42.5,
    description: "You are given two non-empty linked lists representing non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
    ],
    constraints: ["Number of nodes in each list is in range [1, 100]"],
    starterCode: {
      python: "def addTwoNumbers(l1, l2):\n    pass",
      javascript: "function addTwoNumbers(l1, l2) {\n}",
      java: "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    }\n};",
      c: "struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {\n}",
    }
  },
  {
    id: 102, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Strings",
    tags: ["Hash Table", "String", "Sliding Window"], acceptance: 34.1,
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc".' },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    starterCode: {
      python: "def lengthOfLongestSubstring(s):\n    pass",
      javascript: "function lengthOfLongestSubstring(s) {\n}",
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n    }\n};",
      c: "int lengthOfLongestSubstring(char* s) {\n}",
    }
  },
  {
    id: 103, title: "Container With Most Water", difficulty: "Medium", category: "Arrays",
    tags: ["Array", "Two Pointers", "Greedy"], acceptance: 54.8,
    description: "You are given an integer array `height`. Find two lines that together with the x-axis form a container that holds the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    ],
    constraints: ["2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      python: "def maxArea(height):\n    pass",
      javascript: "function maxArea(height) {\n}",
      java: "class Solution {\n    public int maxArea(int[] height) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n    }\n};",
      c: "int maxArea(int* height, int heightSize) {\n}",
    }
  },
  {
    id: 104, title: "3Sum", difficulty: "Medium", category: "Arrays",
    tags: ["Array", "Two Pointers", "Sorting"], acceptance: 33.4,
    description: "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
    ],
    constraints: ["3 <= nums.length <= 3000"],
    starterCode: {
      python: "def threeSum(nums):\n    pass",
      javascript: "function threeSum(nums) {\n}",
      java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n    }\n};",
      c: "int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n}",
    }
  },
  {
    id: 105, title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees",
    tags: ["Tree", "BFS", "Binary Tree"], acceptance: 65.9,
    description: "Given the `root` of a binary tree, return the level order traversal of its nodes' values.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    ],
    constraints: ["Number of nodes in range [0, 2000]"],
    starterCode: {
      python: "def levelOrder(root):\n    pass",
      javascript: "function levelOrder(root) {\n}",
      java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n    }\n};",
      c: "int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {\n}",
    }
  },
  {
    id: 106, title: "Number of Islands", difficulty: "Medium", category: "Graphs",
    tags: ["Array", "DFS", "BFS", "Union Find"], acceptance: 57.6,
    description: "Given an m x n 2D binary grid representing a map of '1's (land) and '0's (water), return the number of islands.",
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
    ],
    constraints: ["1 <= m, n <= 300", 'grid[i][j] is "0" or "1"'],
    starterCode: {
      python: "def numIslands(grid):\n    pass",
      javascript: "function numIslands(grid) {\n}",
      java: "class Solution {\n    public int numIslands(char[][] grid) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n    }\n};",
      c: "int numIslands(char** grid, int gridSize, int* gridColSize) {\n}",
    }
  },
  // ========== HARD ==========
  {
    id: 201, title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Arrays",
    tags: ["Array", "Binary Search", "Divide and Conquer"], acceptance: 37.8,
    description: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n`, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" },
    ],
    constraints: ["0 <= m, n <= 1000", "1 <= m + n <= 2000"],
    starterCode: {
      python: "def findMedianSortedArrays(nums1, nums2):\n    pass",
      javascript: "function findMedianSortedArrays(nums1, nums2) {\n}",
      java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    }\n};",
      c: "double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n}",
    }
  },
  {
    id: 202, title: "Trapping Rain Water", difficulty: "Hard", category: "Arrays",
    tags: ["Array", "Two Pointers", "Stack", "DP"], acceptance: 59.2,
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starterCode: {
      python: "def trap(height):\n    pass",
      javascript: "function trap(height) {\n}",
      java: "class Solution {\n    public int trap(int[] height) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    int trap(vector<int>& height) {\n    }\n};",
      c: "int trap(int* height, int heightSize) {\n}",
    }
  },
  {
    id: 203, title: "N-Queens", difficulty: "Hard", category: "Backtracking",
    tags: ["Array", "Backtracking"], acceptance: 66.5,
    description: "The n-queens puzzle places `n` queens on an `n x n` chessboard so no two queens attack each other. Return all distinct solutions.",
    examples: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
    ],
    constraints: ["1 <= n <= 9"],
    starterCode: {
      python: "def solveNQueens(n):\n    pass",
      javascript: "function solveNQueens(n) {\n}",
      java: "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n    }\n};",
      c: "char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {\n}",
    }
  },
  {
    id: 204, title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked Lists",
    tags: ["Linked List", "Divide and Conquer", "Heap"], acceptance: 49.3,
    description: "You are given an array of `k` linked-lists, each sorted in ascending order. Merge all linked-lists into one sorted linked-list and return it.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
    constraints: ["0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    starterCode: {
      python: "def mergeKLists(lists):\n    pass",
      javascript: "function mergeKLists(lists) {\n}",
      java: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n    }\n}",
      cpp: "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n    }\n};",
      c: "struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {\n}",
    }
  },
];

// Utility exports
export const categories = ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Dynamic Programming', 'Math', 'Backtracking'];
export const getProblemById = (id: number) => problems.find(p => p.id === id);
export const getEasyProblems = () => problems.filter(p => p.difficulty === 'Easy');
export const getMediumProblems = () => problems.filter(p => p.difficulty === 'Medium');
export const getHardProblems = () => problems.filter(p => p.difficulty === 'Hard');
