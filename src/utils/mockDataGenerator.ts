import { UserData } from '@/stores/userStore';

const categories = ['Food Delivery', 'Shopping', 'Entertainment', 'Gas', 'Subscriptions'];
const surpriseExpenses = ['car repair', 'medical bill', 'vet visit', 'home repair', 'emergency'];

const randomInRange = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMockData = (): Partial<UserData> => {
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Sam', 'Jamie', 'Avery', 'Quinn', 'Dakota', 'Reese', 'Blake', 'Skylar', 'Finley'];
  const name = firstNames[randomInRange(0, firstNames.length - 1)];
  const income = randomInRange(800, 2000);
  const spending = randomInRange(600, Math.min(income - 100, 1500));
  const currentSavings = randomInRange(50, 300);
  const emergencyGoal = randomInRange(300, 1000);
  const topCategory = categories[randomInRange(0, categories.length - 1)];
  const topCategoryAmount = randomInRange(50, 200);
  const surpriseExpense = surpriseExpenses[randomInRange(0, surpriseExpenses.length - 1)];
  const surpriseAmount = randomInRange(100, 300);
  const behindGoal = randomInRange(20, 60);

  return {
    name,
    income,
    spending,
    currentSavings,
    emergencyGoal,
    topCategory,
    topCategoryAmount,
    surpriseExpense,
    surpriseAmount,
    behindGoal,
  };
};
