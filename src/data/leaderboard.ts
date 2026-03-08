export interface LeaderboardUser {
  rank: number;
  name: string;
  initials: string;
  problemsSolved: number;
  tutorialsCompleted: number;
  streak: number;
  score: number;
  isCurrentUser?: boolean;
}

export const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'Arjun Mehta', initials: 'AM', problemsSolved: 312, tutorialsCompleted: 20, streak: 45, score: 4980 },
  { rank: 2, name: 'Priya Sharma', initials: 'PS', problemsSolved: 298, tutorialsCompleted: 19, streak: 38, score: 4725 },
  { rank: 3, name: 'Rohit Verma', initials: 'RV', problemsSolved: 285, tutorialsCompleted: 18, streak: 42, score: 4510 },
  { rank: 4, name: 'Ananya Reddy', initials: 'AR', problemsSolved: 270, tutorialsCompleted: 18, streak: 35, score: 4320 },
  { rank: 5, name: 'Vikram Singh', initials: 'VS', problemsSolved: 258, tutorialsCompleted: 17, streak: 30, score: 4105 },
  { rank: 6, name: 'Neha Patel', initials: 'NP', problemsSolved: 245, tutorialsCompleted: 17, streak: 28, score: 3890 },
  { rank: 7, name: 'Karthik Iyer', initials: 'KI', problemsSolved: 230, tutorialsCompleted: 16, streak: 25, score: 3640 },
  { rank: 8, name: 'Divya Nair', initials: 'DN', problemsSolved: 218, tutorialsCompleted: 15, streak: 22, score: 3420 },
  { rank: 9, name: 'Siddharth Joshi', initials: 'SJ', problemsSolved: 205, tutorialsCompleted: 15, streak: 20, score: 3210 },
  { rank: 10, name: 'Meera Kulkarni', initials: 'MK', problemsSolved: 192, tutorialsCompleted: 14, streak: 18, score: 3010 },
  { rank: 11, name: 'Aditya Gupta', initials: 'AG', problemsSolved: 180, tutorialsCompleted: 13, streak: 16, score: 2830 },
  { rank: 12, name: 'Skill Learner', initials: 'SL', problemsSolved: 168, tutorialsCompleted: 12, streak: 14, score: 2650, isCurrentUser: true },
  { rank: 13, name: 'Radhika Menon', initials: 'RM', problemsSolved: 155, tutorialsCompleted: 12, streak: 12, score: 2470 },
  { rank: 14, name: 'Harsh Trivedi', initials: 'HT', problemsSolved: 142, tutorialsCompleted: 11, streak: 10, score: 2280 },
  { rank: 15, name: 'Sneha Deshmukh', initials: 'SD', problemsSolved: 130, tutorialsCompleted: 10, streak: 9, score: 2090 },
  { rank: 16, name: 'Pranav Rao', initials: 'PR', problemsSolved: 118, tutorialsCompleted: 10, streak: 8, score: 1920 },
  { rank: 17, name: 'Ishita Banerjee', initials: 'IB', problemsSolved: 108, tutorialsCompleted: 9, streak: 7, score: 1750 },
  { rank: 18, name: 'Manish Chauhan', initials: 'MC', problemsSolved: 96, tutorialsCompleted: 8, streak: 6, score: 1560 },
  { rank: 19, name: 'Pooja Saxena', initials: 'PS', problemsSolved: 85, tutorialsCompleted: 8, streak: 5, score: 1380 },
  { rank: 20, name: 'Rahul Bhatt', initials: 'RB', problemsSolved: 74, tutorialsCompleted: 7, streak: 5, score: 1210 },
  { rank: 21, name: 'Kavitha Pillai', initials: 'KP', problemsSolved: 65, tutorialsCompleted: 6, streak: 4, score: 1050 },
  { rank: 22, name: 'Deepak Mishra', initials: 'DM', problemsSolved: 55, tutorialsCompleted: 5, streak: 3, score: 890 },
  { rank: 23, name: 'Swati Choudhary', initials: 'SC', problemsSolved: 45, tutorialsCompleted: 4, streak: 2, score: 730 },
  { rank: 24, name: 'Nitin Tiwari', initials: 'NT', problemsSolved: 35, tutorialsCompleted: 3, streak: 2, score: 580 },
  { rank: 25, name: 'Anjali Das', initials: 'AD', problemsSolved: 28, tutorialsCompleted: 2, streak: 1, score: 450 },
];
