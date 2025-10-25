import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PlaidModal } from "@/components/PlaidModal";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const t = translations[userData.language].dashboard;
  const [isPlaidModalOpen, setIsPlaidModalOpen] = useState(false);

  const progressPercentage = (userData.currentSavings / userData.emergencyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Flowwise
          </h1>
          <LanguageToggle />
        </div>

        {/* Goal Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{t.myGoal}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${userData.emergencyGoal} {t.target}</span>
              <span>${userData.currentSavings} {t.saved}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-lg font-semibold text-center">
              {Math.round(progressPercentage)}%
            </p>
          </CardContent>
        </Card>

        {/* Snapshot Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{t.snapshot}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t.income}:</span>
              <span className="text-lg font-semibold text-success">${userData.income}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t.spending}:</span>
              <span className="text-lg font-semibold">${userData.spending}</span>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm">
                {t.behindMessage
                  .replace('{amount}', userData.behindGoal.toString())
                  .replace('{expense}', `$${userData.surpriseAmount} ${userData.surpriseExpense}`)}
              </p>
              <p className="text-sm font-medium text-secondary">
                {t.okayMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Spending Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{t.topSpending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-lg">{userData.topCategory} 🍔</span>
              <span className="text-xl font-bold text-destructive">
                ${userData.topCategoryAmount}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{t.thisWeek}</p>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/coach')}
            className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            {t.talkToCoach}
          </Button>

          <Button
            onClick={() => navigate('/transparency')}
            variant="outline"
            className="w-full"
          >
            {translations[userData.language].transparency.title}
          </Button>

          <Button
            onClick={() => setIsPlaidModalOpen(true)}
            variant="outline"
            className="w-full"
          >
            Reconnect Bank
          </Button>
        </div>

        <PlaidModal 
          open={isPlaidModalOpen} 
          onOpenChange={setIsPlaidModalOpen} 
        />

        {userData.adjustmentConfirmed && (
          <Card className="border-success bg-success/5 shadow-lg animate-slide-up">
            <CardContent className="pt-6">
              <p className="text-sm text-center font-medium">
                {translations[userData.language].preview.successMessage}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
