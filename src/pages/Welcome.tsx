import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaidModal } from "@/components/PlaidModal";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { Shield } from "lucide-react";

const Welcome = () => {
  const [plaidOpen, setPlaidOpen] = useState(false);
  const { userData } = useUserStore();
  const navigate = useNavigate();
  const t = translations[userData.language].welcome;

  useEffect(() => {
    if (userData.bankConnected) {
      navigate('/dashboard');
    }
  }, [userData.bankConnected, navigate]);

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
              onClick={() => setPlaidOpen(true)}
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

      <PlaidModal open={plaidOpen} onOpenChange={setPlaidOpen} />
    </div>
  );
};

export default Welcome;
