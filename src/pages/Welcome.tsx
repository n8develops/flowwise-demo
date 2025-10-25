import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { Shield, Info } from "lucide-react";

const Welcome = () => {
  const { userData } = useUserStore();
  const navigate = useNavigate();
  const t = translations[userData.language].welcome;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70 pt-2">
            <Info className="h-4 w-4" />
            <span>Demo Application</span>
          </div>
        </div>

        <Card className="border-2 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-sm leading-relaxed">
                {t.trustMessage}
              </p>
            </div>

            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              {t.connectButton}
            </Button>

            <div className="mt-4 text-center">
              <button className="text-sm text-primary hover:underline">
                {t.humanAdvisor}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
