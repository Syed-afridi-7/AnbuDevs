export interface AptitudeQuestion {
    id: number;
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    category: string;
    subCategory: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const aptitudeQuestions: AptitudeQuestion[] = [
    {
        id: 1, category: "Quantitative", subCategory: "Time & Work", difficulty: "Easy",
        question: "A can do a piece of work in 10 days and B can do it in 15 days. How long will they take to do it together?",
        options: ["5 days", "6 days", "7 days", "8 days"],
        answer: 1,
        explanation: "A's one day work = 1/10, B's one day work = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6. So they take 6 days.",
    },
    {
        id: 2, category: "Quantitative", subCategory: "Percentage", difficulty: "Easy",
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        answer: 1,
        explanation: "25% of 80 = (25/100) × 80 = 20.",
    },
    {
        id: 3, category: "Quantitative", subCategory: "Profit & Loss", difficulty: "Medium",
        question: "A shopkeeper sells an article at Rs. 480 making a profit of 20%. What is the cost price?",
        options: ["Rs. 360", "Rs. 380", "Rs. 400", "Rs. 420"],
        answer: 2,
        explanation: "SP = CP × (1 + Profit%). 480 = CP × 1.2. CP = 480/1.2 = Rs. 400.",
    },
    {
        id: 4, category: "Quantitative", subCategory: "Speed & Distance", difficulty: "Medium",
        question: "A train travels 300 km in 5 hours. What is its speed in km/h?",
        options: ["50 km/h", "60 km/h", "55 km/h", "65 km/h"],
        answer: 1,
        explanation: "Speed = Distance/Time = 300/5 = 60 km/h.",
    },
    {
        id: 5, category: "Quantitative", subCategory: "Simple Interest", difficulty: "Easy",
        question: "Find the simple interest on Rs. 5000 at 6% per annum for 2 years.",
        options: ["Rs. 500", "Rs. 600", "Rs. 700", "Rs. 800"],
        answer: 1,
        explanation: "SI = (P × R × T)/100 = (5000 × 6 × 2)/100 = Rs. 600.",
    },
    {
        id: 6, category: "Quantitative", subCategory: "LCM & HCF", difficulty: "Medium",
        question: "Find the LCM of 12, 18, and 24.",
        options: ["36", "48", "72", "96"],
        answer: 2,
        explanation: "Prime factorization: 12=2²×3, 18=2×3², 24=2³×3. LCM = 2³×3² = 72.",
    },
    {
        id: 7, category: "Quantitative", subCategory: "Compound Interest", difficulty: "Hard",
        question: "What is the compound interest on Rs. 8000 at 10% per annum for 2 years?",
        options: ["Rs. 1600", "Rs. 1680", "Rs. 1700", "Rs. 1800"],
        answer: 1,
        explanation: "CI = P(1+r/100)^t - P = 8000(1.1)² - 8000 = 9680 - 8000 = Rs. 1680.",
    },
    {
        id: 8, category: "Quantitative", subCategory: "Ages", difficulty: "Medium",
        question: "The ratio of ages of A and B is 3:5. After 10 years, the ratio will be 5:7. Find A's current age.",
        options: ["15 years", "20 years", "25 years", "30 years"],
        answer: 0,
        explanation: "Let A=3x, B=5x. After 10 years: (3x+10)/(5x+10)=5/7. 7(3x+10)=5(5x+10). 21x+70=25x+50. 4x=20. x=5. A=3x=15.",
    },
    {
        id: 9, category: "Logical", subCategory: "Series", difficulty: "Easy",
        question: "Find the next number: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "48"],
        answer: 1,
        explanation: "Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42.",
    },
    {
        id: 10, category: "Logical", subCategory: "Coding-Decoding", difficulty: "Easy",
        question: "If CAT = 3120 and DOG = 4157, what is BAT?",
        options: ["2120", "2121", "2120", "2220"],
        answer: 0,
        explanation: "Each letter's position: C=3,A=1,T=20 → 3120. B=2,A=1,T=20 → 2120.",
    },
    {
        id: 11, category: "Logical", subCategory: "Blood Relations", difficulty: "Medium",
        question: "A is B's brother. C is A's mother. D is C's father. How is A related to D?",
        options: ["Son", "Grandson", "Great Grandson", "Nephew"],
        answer: 1,
        explanation: "A is C's son, C is D's daughter. So A is D's grandson.",
    },
    {
        id: 12, category: "Logical", subCategory: "Syllogism", difficulty: "Medium",
        question: "All cats are animals. Some animals are dogs. Which conclusion is valid?\nI. Some cats are dogs.\nII. Some dogs are animals.",
        options: ["Only I", "Only II", "Both I and II", "Neither"],
        answer: 1,
        explanation: "'Some dogs are animals' is valid since 'Some animals are dogs'. 'Some cats are dogs' cannot be concluded.",
    },
    {
        id: 13, category: "Logical", subCategory: "Direction Sense", difficulty: "Medium",
        question: "A man walks 5km North, then 3km East, then 5km South. How far is he from start?",
        options: ["1 km", "2 km", "3 km", "5 km"],
        answer: 2,
        explanation: "N and S cancel out. He's 3km East of start.",
    },
    {
        id: 14, category: "Logical", subCategory: "Puzzles", difficulty: "Hard",
        question: "In a row of 5 people, A is not at either end. B is to the right of A. C is to the left of A. D is at the rightmost end. Who is at the leftmost end?",
        options: ["A", "C", "E", "B"],
        answer: 2,
        explanation: "D is at right end. A is not at ends. B is right of A, C is left of A. Order: E, C, A, B, D. E is at left end.",
    },
];

export const aptitudeCategories = ['All', 'Quantitative', 'Logical'];
export const aptitudeSubCategories: Record<string, string[]> = {
    Quantitative: ['All', 'Time & Work', 'Percentage', 'Profit & Loss', 'Speed & Distance', 'Simple Interest', 'Compound Interest', 'LCM & HCF', 'Ages'],
    Logical: ['All', 'Series', 'Coding-Decoding', 'Blood Relations', 'Syllogism', 'Direction Sense', 'Puzzles'],
};
