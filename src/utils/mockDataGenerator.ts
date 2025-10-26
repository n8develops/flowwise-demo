import { UserData } from '@/stores/userStore';

const categories = ['Food Delivery', 'Shopping', 'Entertainment', 'Gas', 'Subscriptions'];
const surpriseExpenses = ['car repair', 'medical bill', 'vet visit', 'home repair', 'emergency'];

const randomInRange = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export interface DetailedTransaction {
  date: string;
  merchant: string;
  category: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  location: string;
  description: string;
  alignmentScore: number;
  impact: 'Positive' | 'Neutral' | 'Negative';
  icon: string;
}

const merchants = {
  'Food Delivery': ['Uber Eats', 'DoorDash', 'Grubhub', 'Postmates'],
  'Groceries': ['Whole Foods', 'Trader Joe\'s', 'Safeway', 'Walmart'],
  'Entertainment': ['Netflix', 'Spotify', 'AMC Theaters', 'Live Nation'],
  'Gas': ['Shell', 'Chevron', 'BP', '76 Gas'],
  'Shopping': ['Amazon', 'Target', 'Best Buy', 'Macy\'s'],
  'Coffee': ['Starbucks', 'Peet\'s Coffee', 'Blue Bottle', 'Philz Coffee'],
  'Bills': ['PG&E', 'Comcast', 'AT&T', 'Rent Payment'],
  'Income': ['Salary', 'Freelance', 'Side Hustle', 'Bonus'],
  'Subscriptions': ['Apple Music', 'Disney+', 'Adobe', 'YouTube Premium'],
  'Dining': ['Chipotle', 'Olive Garden', 'In-N-Out', 'Panera']
};

const icons = {
  'Food Delivery': '🍔',
  'Groceries': '🛒',
  'Entertainment': '🎬',
  'Gas': '⛽',
  'Shopping': '🛍️',
  'Coffee': '☕',
  'Bills': '📄',
  'Income': '💰',
  'Subscriptions': '📱',
  'Dining': '🍽️'
};

const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'Venmo'];
const locations = ['San Francisco, CA', 'Oakland, CA', 'San Jose, CA', 'Berkeley, CA', 'Online'];

export const generateDetailedTransactions = (): DetailedTransaction[] => {
  const transactions: DetailedTransaction[] = [];
  const allCategories = Object.keys(merchants);
  
  // Generate 15 transactions over the last 14 days
  for (let i = 0; i < 15; i++) {
    const daysAgo = randomInRange(0, 14);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const category = allCategories[randomInRange(0, allCategories.length - 1)];
    const merchantList = merchants[category as keyof typeof merchants];
    const merchant = merchantList[randomInRange(0, merchantList.length - 1)];
    
    // Determine if income or expense
    const isIncome = category === 'Income';
    const amount = isIncome 
      ? randomInRange(800, 2000) 
      : -randomInRange(15, 250);
    
    // Calculate alignment score based on category and amount
    let alignmentScore = 0;
    if (category === 'Income') {
      alignmentScore = randomInRange(7, 10);
    } else if (category === 'Groceries') {
      alignmentScore = randomInRange(-2, 2);
    } else if (category === 'Bills') {
      alignmentScore = randomInRange(-3, 0);
    } else if (['Food Delivery', 'Entertainment', 'Subscriptions'].includes(category)) {
      alignmentScore = randomInRange(-8, -3);
    } else if (category === 'Coffee') {
      alignmentScore = randomInRange(-5, -2);
    } else if (category === 'Shopping') {
      alignmentScore = randomInRange(-6, -1);
    } else {
      alignmentScore = randomInRange(-4, 1);
    }
    
    const impact = alignmentScore > 0 ? 'Positive' : alignmentScore < -3 ? 'Negative' : 'Neutral';
    
    const descriptions = {
      'Food Delivery': 'Late night delivery order',
      'Groceries': 'Weekly grocery shopping',
      'Entertainment': 'Monthly streaming service',
      'Gas': 'Gas station fill-up',
      'Shopping': 'Online purchase',
      'Coffee': 'Morning coffee run',
      'Bills': 'Monthly utility payment',
      'Income': 'Direct deposit',
      'Subscriptions': 'Recurring subscription',
      'Dining': 'Restaurant meal'
    };
    
    transactions.push({
      date: date.toISOString().split('T')[0],
      merchant,
      category,
      amount,
      paymentMethod: paymentMethods[randomInRange(0, paymentMethods.length - 1)],
      transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      location: category === 'Income' || category === 'Bills' || category === 'Subscriptions' 
        ? 'Online' 
        : locations[randomInRange(0, locations.length - 1)],
      description: descriptions[category as keyof typeof descriptions] || 'Transaction',
      alignmentScore,
      impact,
      icon: icons[category as keyof typeof icons] || '💳'
    });
  }
  
  // Sort by date, most recent first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

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
