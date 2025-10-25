import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { Shield, Building2, CreditCard } from "lucide-react";

const Welcome = () => {
  const { userData, connectBank } = useUserStore();
  const navigate = useNavigate();
  const t = translations[userData.language].welcome;
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showBanks, setShowBanks] = useState(false);

  const banks = [
    { id: 'chase', name: 'Chase Bank', color: 'bg-blue-600' },
    { id: 'bofa', name: 'Bank of America', color: 'bg-red-600' },
    { id: 'wells', name: 'Wells Fargo', color: 'bg-yellow-600' },
    { id: 'citi', name: 'Citibank', color: 'bg-blue-500' },
  ];

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setTimeout(() => {
      connectBank();
      navigate('/dashboard');
    }, 1000);
  };

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
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-sm leading-relaxed">
                {t.trustMessage}
              </p>
            </div>

            {!showBanks ? (
              <Button
                onClick={() => setShowBanks(true)}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {t.connectPlaid}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-center font-semibold text-sm">{t.selectYourBank}</p>
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    disabled={selectedBank !== null}
                    className="w-full p-4 border-2 rounded-lg hover:border-primary hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 ${bank.color} rounded flex items-center justify-center`}>
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium">{bank.name}</span>
                    {selectedBank === bank.id && (
                      <span className="ml-auto text-sm text-primary animate-pulse">
                        {t.connecting}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

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
