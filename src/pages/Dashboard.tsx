import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { TrendingUp, Wallet, ShoppingBag, Lightbulb, Shield, Sparkles } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const t = translations[userData.language].dashboard;

  const progressPercentage = (userData.currentSavings / userData.emergencyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-6xl mx-auto p-8 space-y-8 animate-fade-in pb-20">
        {/* Main content landmark */}
        <main id="main-content" className="space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg" aria-hidden="true">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Flowwise
            </h1>
          </div>
          <nav className="flex items-center gap-2" aria-label="Main navigation">
            <Button
              onClick={() => navigate('/learning')}
              variant="outline"
              size="sm"
              className="rounded-full border-2 hover:border-primary hover:bg-primary/5"
              aria-label="Go to learning center"
            >
              <Lightbulb className="h-4 w-4 mr-1" aria-hidden="true" />
              {translations[userData.language].learning.title}
            </Button>
            <ThemeToggle />
            <LanguageToggle />
          </nav>
        </header>

        {/* Welcome Message */}
        <Card className="relative overflow-hidden border-none shadow-xl" role="banner">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" aria-hidden="true" />
          <CardContent className="relative p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome, {userData.name}! <span aria-hidden="true">👋</span>
            </h2>
            <p className="text-muted-foreground mt-1">Here's your financial overview</p>
          </CardContent>
        </Card>

        {/* Goal Card - Hero Style */}
        <section 
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          aria-labelledby="goal-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" aria-hidden="true" />
          <CardContent className="relative p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 id="goal-heading" className="text-2xl font-bold text-white">{t.myGoal}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-white/90 text-sm font-medium">
                <span><span className="sr-only">Currently saved: </span>${userData.currentSavings} {t.saved}</span>
                <span><span className="sr-only">Target: </span>${userData.emergencyGoal} {t.target}</span>
              </div>
              <div className="relative">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm" role="progressbar" aria-valuenow={Math.round(progressPercentage)} aria-valuemin={0} aria-valuemax={100} aria-label="Savings progress">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <p className="text-4xl font-bold text-white text-center" aria-live="polite">
                {Math.round(progressPercentage)}%
              </p>
            </div>
          </CardContent>
        </section>

        {/* Snapshot - Modern Cards Grid with Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" role="region" aria-label="Financial snapshot">
          <Card className="relative overflow-hidden border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5" />
            <CardContent className="relative p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{t.income}</p>
                    <p className="text-3xl font-bold text-success">${userData.income}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 20, 2025</span>
                  <span className="text-success font-semibold">+$1,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 13, 2025</span>
                  <span className="text-success font-semibold">+$1,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 6, 2025</span>
                  <span className="text-success font-semibold">+$1,200</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5" />
            <CardContent className="relative p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{t.spending}</p>
                    <p className="text-3xl font-bold text-destructive">${userData.spending}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 24, 2025</span>
                  <span className="text-destructive font-semibold">-$45</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 23, 2025</span>
                  <span className="text-destructive font-semibold">-$120</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Oct 22, 2025</span>
                  <span className="text-destructive font-semibold">-$35</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Talk to AI Flow Coach */}
        <Button
          onClick={() => navigate('/coach')}
          className="w-full h-16 text-base font-semibold shadow-lg rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all"
          aria-label="Talk to your AI financial coach"
        >
          <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
          {t.talkToCoach}
        </Button>

        {/* Recent Transactions */}
        <Card className="relative overflow-hidden border-none shadow-xl" role="region" aria-labelledby="transactions-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" aria-hidden="true" />
          <CardContent className="relative p-8">
            <h3 id="transactions-heading" className="text-xl font-bold mb-6">Recent Transactions</h3>
            <ul className="space-y-3" role="list">
              <li className="flex justify-between items-center p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center" aria-hidden="true">
                    🍔
                  </div>
                  <div>
                    <p className="font-semibold">Fast Food</p>
                    <p className="text-sm text-muted-foreground"><time dateTime="2025-10-24">Oct 24, 2025</time></p>
                  </div>
                </div>
                <span className="text-destructive font-bold" aria-label="Expense of 45 dollars">-$45.00</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center" aria-hidden="true">
                    🛒
                  </div>
                  <div>
                    <p className="font-semibold">Groceries</p>
                    <p className="text-sm text-muted-foreground"><time dateTime="2025-10-23">Oct 23, 2025</time></p>
                  </div>
                </div>
                <span className="text-destructive font-bold" aria-label="Expense of 120 dollars">-$120.00</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center" aria-hidden="true">
                    ☕
                  </div>
                  <div>
                    <p className="font-semibold">Coffee Shop</p>
                    <p className="text-sm text-muted-foreground"><time dateTime="2025-10-22">Oct 22, 2025</time></p>
                  </div>
                </div>
                <span className="text-destructive font-bold" aria-label="Expense of 35 dollars">-$35.00</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center" aria-hidden="true">
                    💰
                  </div>
                  <div>
                    <p className="font-semibold">Salary</p>
                    <p className="text-sm text-muted-foreground"><time dateTime="2025-10-20">Oct 20, 2025</time></p>
                  </div>
                </div>
                <span className="text-success font-bold" aria-label="Income of 1200 dollars">+$1,200.00</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Behind Goal Message - Floating Card */}
        <Card className="relative overflow-hidden border-none shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/5 to-transparent" />
          <CardContent className="relative p-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm leading-relaxed">
                  {t.behindMessage
                    .replace('{amount}', userData.behindGoal.toString())
                    .replace('{expense}', `${userData.surpriseAmount} ${userData.surpriseExpense}`)}
                </p>
                <p className="text-sm font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {t.okayMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Spending - Bold Card */}
        <Card className="relative overflow-hidden border-none shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.topSpending}</p>
                <p className="text-xl font-bold">{userData.topCategory} 🍔</p>
                <p className="text-xs text-muted-foreground">{t.thisWeek}</p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 shadow-lg">
                <p className="text-2xl font-bold text-white">${userData.topCategoryAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">

          <Button
            onClick={() => navigate('/transparency')}
            variant="outline"
            className="w-full h-14 rounded-xl border-2 hover:border-secondary hover:bg-secondary/5"
          >
            <Shield className="h-4 w-4 mr-2" />
            {translations[userData.language].transparency.title}
          </Button>
        </div>

        {/* Success Message */}
        {userData.adjustmentConfirmed && (
          <Card className="relative overflow-hidden border-none shadow-xl animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5" aria-hidden="true" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <span className="text-xl" aria-hidden="true">✅</span>
                </div>
                <p className="text-sm font-medium">
                  {translations[userData.language].preview.successMessage}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
