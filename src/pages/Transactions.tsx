import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { ArrowLeft, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { generateDetailedTransactions } from "@/utils/mockDataGenerator";
import { useMemo } from "react";

const Transactions = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const t = translations[userData.language].transactions;
  
  const transactions = useMemo(() => generateDetailedTransactions(), []);
  
  // Generate chart data from transactions
  const chartData = useMemo(() => {
    const dates = transactions.map(t => t.date).sort();
    const uniqueDates = [...new Set(dates)];
    
    return uniqueDates.map(date => {
      const dayTransactions = transactions.filter(t => t.date === date);
      const cumulativeScore = dayTransactions.reduce((sum, t) => sum + t.alignmentScore, 0);
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        alignment: cumulativeScore,
        target: 0
      };
    });
  }, [transactions]);

  // Get top aligned and hurting transactions
  const alignedTransactions = useMemo(() => 
    transactions.filter(t => t.alignmentScore > 0).sort((a, b) => b.alignmentScore - a.alignmentScore).slice(0, 3),
    [transactions]
  );
  
  const hurtingTransactions = useMemo(() => 
    transactions.filter(t => t.alignmentScore < 0).sort((a, b) => a.alignmentScore - b.alignmentScore).slice(0, 3),
    [transactions]
  );

  const getAlignmentColor = (score: number) => {
    if (score > 3) return "text-success";
    if (score > 0) return "text-success/70";
    if (score > -3) return "text-destructive/70";
    return "text-destructive";
  };

  const getAlignmentBadge = (score: number) => {
    if (score > 3) return { text: t.positive, class: "bg-success/20 text-success" };
    if (score > 0) return { text: t.positive, class: "bg-success/10 text-success/70" };
    if (score > -3) return { text: t.negative, class: "bg-destructive/10 text-destructive/70" };
    return { text: t.negative, class: "bg-destructive/20 text-destructive" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-in pb-20">
        <main id="main-content" className="space-y-8">
          {/* Header */}
          <header className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                size="sm"
                className="hover:bg-accent/10"
                aria-label={t.backToDashboard}
              >
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t.backToDashboard}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg" aria-hidden="true">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t.title}
                </h1>
              </div>
            </div>
            <nav className="flex items-center gap-2" aria-label="Settings navigation">
              <ThemeToggle />
              <LanguageToggle />
            </nav>
          </header>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - Detailed Transactions (60% width - 3 columns) */}
            <Card className="lg:col-span-3 relative overflow-hidden border-none shadow-xl" role="region" aria-labelledby="transactions-list-heading">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" aria-hidden="true" />
              <CardContent className="relative p-8">
                <h2 id="transactions-list-heading" className="text-2xl font-bold mb-6">{t.detailedTransactions}</h2>
                <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2" role="list">
                  {transactions.map((transaction, index) => {
                    const badge = getAlignmentBadge(transaction.alignmentScore);
                    return (
                      <div 
                        key={index}
                        className="flex justify-between items-start p-4 bg-background/50 rounded-lg hover:bg-accent/10 hover:shadow-md transition-all"
                        role="listitem"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg ${transaction.amount > 0 ? 'bg-success/20' : 'bg-destructive/20'} flex items-center justify-center text-2xl flex-shrink-0`} aria-hidden="true">
                            {transaction.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold truncate">{transaction.merchant}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${badge.class} whitespace-nowrap`}>
                                {transaction.alignmentScore > 0 ? '+' : ''}{transaction.alignmentScore}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{transaction.category}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <time dateTime={transaction.date}>{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                              <span>•</span>
                              <span>{transaction.paymentMethod}</span>
                            </div>
                            {transaction.description && (
                              <p className="text-xs text-muted-foreground mt-1 italic">{transaction.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <span className={`text-lg font-bold ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">{badge.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Right Panels (40% width - 2 columns) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Goal Alignment Chart */}
              <Card className="relative overflow-hidden border-none shadow-xl" role="region" aria-labelledby="chart-heading">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent" aria-hidden="true" />
                <CardContent className="relative p-6">
                  <h3 id="chart-heading" className="text-xl font-bold mb-4">{t.goalAlignment}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="alignment" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Goal Alignment"
                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Insights Card */}
              <Card className="relative overflow-hidden border-none shadow-xl" role="region" aria-labelledby="insights-heading">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
                <CardContent className="relative p-6 space-y-6">
                  <h3 id="insights-heading" className="text-xl font-bold">{t.insights}</h3>
                  
                  {/* Aligning with Goals */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-success" aria-hidden="true" />
                      <h4 className="font-semibold text-success">{t.aligningWithGoals}</h4>
                    </div>
                    <div className="space-y-2">
                      {alignedTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg" aria-hidden="true">{transaction.icon}</span>
                            <div>
                              <p className="text-sm font-medium">{transaction.merchant}</p>
                              <p className="text-xs text-muted-foreground">{transaction.category}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-success">+{transaction.alignmentScore}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hurting Goals */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="h-5 w-5 text-destructive" aria-hidden="true" />
                      <h4 className="font-semibold text-destructive">{t.hurtingGoals}</h4>
                    </div>
                    <div className="space-y-2">
                      {hurtingTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg" aria-hidden="true">{transaction.icon}</span>
                            <div>
                              <p className="text-sm font-medium">{transaction.merchant}</p>
                              <p className="text-xs text-muted-foreground">{transaction.category}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-destructive">{transaction.alignmentScore}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
