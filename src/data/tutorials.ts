export interface Tutorial {
  id: string;
  title: string;
  category: string;
}

export interface TutorialCategory {
  name: string;
  tutorials: Tutorial[];
}

export const tutorialCategories: TutorialCategory[] = [
  {
    name: 'Data Structures',
    tutorials: [
      { id: 'ds-1', title: 'Arrays & Strings', category: 'Data Structures' },
      { id: 'ds-2', title: 'Linked Lists', category: 'Data Structures' },
      { id: 'ds-3', title: 'Stacks & Queues', category: 'Data Structures' },
      { id: 'ds-4', title: 'Hash Tables', category: 'Data Structures' },
      { id: 'ds-5', title: 'Trees & BST', category: 'Data Structures' },
    ],
  },
  {
    name: 'Algorithms',
    tutorials: [
      { id: 'alg-1', title: 'Sorting Algorithms', category: 'Algorithms' },
      { id: 'alg-2', title: 'Binary Search', category: 'Algorithms' },
      { id: 'alg-3', title: 'Recursion & Backtracking', category: 'Algorithms' },
      { id: 'alg-4', title: 'Dynamic Programming', category: 'Algorithms' },
      { id: 'alg-5', title: 'Graph Algorithms', category: 'Algorithms' },
    ],
  },
  {
    name: 'Web Development',
    tutorials: [
      { id: 'web-1', title: 'HTML & CSS Basics', category: 'Web Development' },
      { id: 'web-2', title: 'JavaScript Essentials', category: 'Web Development' },
      { id: 'web-3', title: 'React Fundamentals', category: 'Web Development' },
      { id: 'web-4', title: 'TypeScript for React', category: 'Web Development' },
      { id: 'web-5', title: 'REST API Design', category: 'Web Development' },
    ],
  },
  {
    name: 'System Design',
    tutorials: [
      { id: 'sd-1', title: 'Scalability Basics', category: 'System Design' },
      { id: 'sd-2', title: 'Database Design', category: 'System Design' },
      { id: 'sd-3', title: 'Caching Strategies', category: 'System Design' },
      { id: 'sd-4', title: 'Load Balancing', category: 'System Design' },
      { id: 'sd-5', title: 'Microservices Architecture', category: 'System Design' },
    ],
  },
];
