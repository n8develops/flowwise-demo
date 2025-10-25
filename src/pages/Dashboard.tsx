import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LanguageToggle } from "@/components/LanguageToggle";
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
      <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Flowwise
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/learning')}
              variant="outline"
              size="sm"
              className="rounded-full border-2 hover:border-primary hover:bg-primary/5"
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              {translations[userData.language].learning.title}
            </Button>
            <LanguageToggle />
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="relative overflow-hidden border-none shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <CardContent className="relative p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome, {userData.name}! 👋
            </h2>
            <p className="text-muted-foreground mt-1">Here's your financial overview</p>
          </CardContent>
        </Card>

        {/* Goal Card - Hero Style */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
          <CardContent className="relative p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t.myGoal}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-white/90 text-sm font-medium">
                <span>${userData.currentSavings} {t.saved}</span>
                <span>${userData.emergencyGoal} {t.target}</span>
              </div>
              <div className="relative">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <p className="text-4xl font-bold text-white text-center">
                {Math.round(progressPercentage)}%
              </p>
            </div>
          </CardContent>
        </div>

        {/* Snapshot - Modern Cards Grid with Visual Chart */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="relative overflow-hidden border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5" />
            <CardContent className="relative p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.income}</p>
              <p className="text-2xl font-bold text-success">${userData.income}</p>
              <div className="flex items-end gap-1 h-12 mt-2">
                {[40, 55, 45, 60, 70, 65, 80].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-success/30 rounded-t transition-all hover:bg-success/50"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5" />
            <CardContent className="relative p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.spending}</p>
              <p className="text-2xl font-bold text-destructive">${userData.spending}</p>
              <div className="flex items-end gap-1 h-12 mt-2">
                {[60, 70, 55, 75, 65, 80, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-destructive/30 rounded-t transition-all hover:bg-destructive/50"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
                    .replace('{expense}', `$${userData.surpriseAmount} ${userData.surpriseExpense}`)}
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
            onClick={() => navigate('/coach')}
            className="w-full h-16 text-lg font-semibold shadow-xl rounded-2xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all"
            size="lg"
          >
            <span className="mr-2">🤖</span>
            {t.talkToCoach}
          </Button>

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
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <p className="text-sm font-medium">
                  {translations[userData.language].preview.successMessage}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
