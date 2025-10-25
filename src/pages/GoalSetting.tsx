import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { Sparkles } from "lucide-react";

type Step = 'greeting' | 'ask-priority' | 'follow-up' | 'generating' | 'complete';

const GoalSetting = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const t = translations[userData.language].goalSetting;
  const [step, setStep] = useState<Step>('greeting');
  const [showTyping, setShowTyping] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  useEffect(() => {
    if (step === 'greeting') {
      setShowTyping(true);
      const timer = setTimeout(() => {
        setShowTyping(false);
        setMessages([{ text: t.greeting, isUser: false }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { text: t.askPriority, isUser: false }]);
        }, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, t]);

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriority(priority);
    setMessages(prev => [...prev, { text: priority, isUser: true }]);
    setShowTyping(true);
    
    setTimeout(() => {
      setShowTyping(false);
      setStep('follow-up');
      setMessages(prev => [...prev, { text: t.followUp, isUser: false }]);
    }, 1500);
  };

  const handleAmountSelect = (amount: string) => {
    setMessages(prev => [...prev, { text: amount, isUser: true }]);
    setShowTyping(true);
    
    setTimeout(() => {
      setShowTyping(false);
      setStep('generating');
      setMessages(prev => [...prev, { text: t.generating, isUser: false }]);
      
      setTimeout(() => {
        const goalMessage = t.goalCreated
          .replace('{goal}', selectedPriority || 'Emergency Fund')
          .replace('{amount}', userData.emergencyGoal.toString());
        setMessages(prev => [...prev, { text: goalMessage, isUser: false }]);
        setStep('complete');
      }, 2000);
    }, 1500);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 animate-fade-in">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-[85%] shadow-md ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                <CardContent className="pt-4 pb-4 px-5">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex justify-start">
              <Card className="bg-card shadow-md">
                <CardContent className="pt-3 pb-3 px-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Priority Options */}
          {step === 'ask-priority' && !showTyping && (
            <div className="grid grid-cols-2 gap-3 pt-4 animate-slide-up">
              <Button
                onClick={() => handlePrioritySelect(t.priorityEmergency)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5"
              >
                💰 {t.priorityEmergency}
              </Button>
              <Button
                onClick={() => handlePrioritySelect(t.priorityDebt)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5"
              >
                💳 {t.priorityDebt}
              </Button>
              <Button
                onClick={() => handlePrioritySelect(t.prioritySave)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5"
              >
                🎯 {t.prioritySave}
              </Button>
              <Button
                onClick={() => handlePrioritySelect(t.priorityWealth)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5"
              >
                📈 {t.priorityWealth}
              </Button>
            </div>
          )}

          {/* Amount Options */}
          {step === 'follow-up' && !showTyping && (
            <div className="grid grid-cols-3 gap-3 pt-4 animate-slide-up">
              <Button
                onClick={() => handleAmountSelect('$25/week')}
                variant="outline"
                className="h-16 font-medium hover:border-primary hover:bg-primary/5"
              >
                $25/week
              </Button>
              <Button
                onClick={() => handleAmountSelect('$50/week')}
                variant="outline"
                className="h-16 font-medium hover:border-primary hover:bg-primary/5"
              >
                $50/week
              </Button>
              <Button
                onClick={() => handleAmountSelect('$100/week')}
                variant="outline"
                className="h-16 font-medium hover:border-primary hover:bg-primary/5"
              >
                $100/week
              </Button>
            </div>
          )}

          {/* Continue Button */}
          {step === 'complete' && (
            <div className="pt-4 animate-slide-up">
              <Button
                onClick={handleContinue}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                {t.continueToDashboard}
              </Button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        {step !== 'complete' && (
          <Card className="bg-muted/50 border-0 mt-8">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                {translations[userData.language].coach.disclaimer}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;
