import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { ArrowLeft } from "lucide-react";

const Coach = () => {
  const navigate = useNavigate();
  const { userData, selectOption } = useUserStore();
  const t = translations[userData.language].coach;
  const [showTyping, setShowTyping] = useState(true);

  useState(() => {
    const timer = setTimeout(() => setShowTyping(false), 1500);
    return () => clearTimeout(timer);
  });

  const handleOptionSelect = (option: 'A' | 'B') => {
    selectOption(option);
    navigate('/preview');
  };

  const greeting = t.greeting
    .replace('{name}', userData.name)
    .replace('{amount}', userData.surpriseAmount.toString())
    .replace('{expense}', userData.surpriseExpense)
    .replace('{behind}', `$${userData.behindGoal}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{t.title}</h1>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 animate-fade-in">
          {/* AI Message 1 */}
          <div className="flex justify-start">
            <Card className="max-w-[85%] bg-card shadow-md">
              <CardContent className="pt-4 pb-4 px-4">
                <p className="text-sm leading-relaxed">{greeting}</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Message 2 */}
          <div className="flex justify-start">
            <Card className="max-w-[85%] bg-card shadow-md">
              <CardContent className="pt-4 pb-4 px-4">
                <p className="text-sm leading-relaxed font-medium">{t.question}</p>
              </CardContent>
            </Card>
          </div>

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex justify-start">
              <Card className="bg-card shadow-md">
                <CardContent className="pt-3 pb-3 px-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Options */}
          {!showTyping && (
            <div className="space-y-3 pt-4 animate-slide-up">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer shadow-md">
                <CardContent className="pt-4 pb-4">
                  <p className="font-medium mb-3">{t.optionA}</p>
                  <Button
                    onClick={() => handleOptionSelect('A')}
                    variant="outline"
                    className="w-full"
                  >
                    {t.preview}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors cursor-pointer shadow-md">
                <CardContent className="pt-4 pb-4">
                  <p className="font-medium mb-3">{t.optionB}</p>
                  <Button
                    onClick={() => handleOptionSelect('B')}
                    variant="outline"
                    className="w-full"
                  >
                    {t.preview}
                  </Button>
                </CardContent>
              </Card>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {/* Talk to human advisor */}}
              >
                {t.humanAdvisor}
              </Button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <Card className="bg-muted/50 border-0 mt-8">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {t.disclaimer}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coach;
