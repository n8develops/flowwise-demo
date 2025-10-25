import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { ArrowLeft, Check } from "lucide-react";

const Preview = () => {
  const navigate = useNavigate();
  const { userData, confirmAdjustment } = useUserStore();
  const t = translations[userData.language].preview;
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    confirmAdjustment();
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const optionText = userData.selectedOption === 'A' ? t.optionAText : t.optionBText;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-success shadow-xl animate-slide-up">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="rounded-full bg-success p-6 inline-block mb-6">
              <Check className="h-16 w-16 text-success-foreground" />
            </div>
            <p className="text-lg font-medium leading-relaxed">
              {t.successMessage}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/coach')}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">{t.title}</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Preview Card */}
        <Card className="shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg">
              Option {userData.selectedOption}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base leading-relaxed">
              {optionText}
            </p>

            {/* Timeline Visualization */}
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                    1
                  </div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="flex-1 h-0.5 bg-border mx-2"></div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold mb-2">
                    2
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userData.selectedOption === 'A' ? 'Apr 12' : 'Apr 5'}
                  </p>
                </div>
                <div className="flex-1 h-0.5 bg-border mx-2"></div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold mb-2">
                    ✓
                  </div>
                  <p className="text-xs text-muted-foreground">Goal!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleConfirm}
            className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            {t.confirm}
          </Button>

          <Button
            onClick={() => navigate('/coach')}
            variant="outline"
            className="w-full h-12"
          >
            {t.goBack}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
