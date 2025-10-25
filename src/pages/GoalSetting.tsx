import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { Sparkles } from "lucide-react";

type Step = 'greeting' | 'round1' | 'round2' | 'round3' | 'complete';

const GoalSetting = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const t = translations[userData.language].goalSetting;
  const [step, setStep] = useState<Step>('greeting');
  const [showTyping, setShowTyping] = useState(false);
  const [crystalClarity, setCrystalClarity] = useState(0); // 0, 33, 66, 100
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedPainPoint, setSelectedPainPoint] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  useEffect(() => {
    if (step === 'greeting') {
      setShowTyping(true);
      const timer = setTimeout(() => {
        setShowTyping(false);
        setMessages([{ text: t.greeting, isUser: false }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { text: t.round1Question, isUser: false }]);
          setStep('round1');
        }, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, t]);

  const handleGoalSelect = (goal: string, displayText: string) => {
    setSelectedGoal(goal);
    setMessages(prev => [...prev, { text: displayText, isUser: true }]);
    setShowTyping(true);
    
    // Crystal ball gets clearer
    setTimeout(() => {
      setCrystalClarity(33);
      setShowTyping(false);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: t.round2Question, isUser: false }]);
        setStep('round2');
      }, 300);
    }, 600);
  };

  const handlePainPointSelect = (painPoint: string, displayText: string) => {
    setSelectedPainPoint(painPoint);
    setMessages(prev => [...prev, { text: displayText, isUser: true }]);
    setShowTyping(true);
    
    // Crystal ball gets even clearer
    setTimeout(() => {
      setCrystalClarity(66);
      setShowTyping(false);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: t.round3Question, isUser: false }]);
        setStep('round3');
      }, 300);
    }, 600);
  };

  const handleCommitmentSelect = (commitment: string, displayText: string) => {
    setMessages(prev => [...prev, { text: displayText, isUser: true }]);
    setShowTyping(true);
    
    // Crystal ball fully clear
    setTimeout(() => {
      setCrystalClarity(100);
      setShowTyping(false);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: t.finalMessage, isUser: false }]);
        setStep('complete');
      }, 300);
    }, 600);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main id="main-content" className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header with Crystal Ball */}
        <header className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg" aria-hidden="true">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
          
          {/* Crystal Ball Visualization */}
          <div className="relative w-32 h-32 flex items-center justify-center" role="img" aria-label={`Goal clarity: ${crystalClarity} percent`}>
            {/* Outer glow */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl transition-all duration-1000"
              style={{ 
                opacity: crystalClarity / 100,
                transform: `scale(${1 + crystalClarity / 200})`
              }}
              aria-hidden="true"
            />
            {/* Crystal ball */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border-2 border-primary/40 flex items-center justify-center shadow-2xl transition-all duration-1000"
              style={{ 
                filter: `blur(${(100 - crystalClarity) / 20}px)`,
                borderColor: `hsl(var(--primary) / ${crystalClarity / 100})`
              }}
            >
              <span className="text-4xl transition-all duration-1000" style={{ opacity: crystalClarity / 100 }}>
                🔮
              </span>
            </div>
            {/* Inner sparkles */}
            {crystalClarity > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles 
                  className="absolute text-primary animate-pulse" 
                  style={{ 
                    opacity: crystalClarity / 100,
                    top: '10%',
                    left: '20%'
                  }} 
                  size={12}
                />
                <Sparkles 
                  className="absolute text-secondary animate-pulse" 
                  style={{ 
                    opacity: crystalClarity / 100,
                    bottom: '15%',
                    right: '15%',
                    animationDelay: '0.5s'
                  }} 
                  size={16}
                />
              </div>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="flex gap-2" role="progressbar" aria-valuenow={crystalClarity} aria-valuemin={0} aria-valuemax={100} aria-label="Goal setting progress">
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${crystalClarity >= 33 ? 'bg-primary' : 'bg-muted'}`} aria-label={crystalClarity >= 33 ? 'Step 1 complete' : 'Step 1 incomplete'} />
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${crystalClarity >= 66 ? 'bg-primary' : 'bg-muted'}`} aria-label={crystalClarity >= 66 ? 'Step 2 complete' : 'Step 2 incomplete'} />
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${crystalClarity >= 100 ? 'bg-primary' : 'bg-muted'}`} aria-label={crystalClarity >= 100 ? 'Step 3 complete' : 'Step 3 incomplete'} />
          </div>
        </header>

        {/* Chat Messages */}
        <div className="space-y-4 animate-fade-in" role="log" aria-live="polite" aria-label="Conversation with AI coach">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-[85%] shadow-md ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}`} role="article" aria-label={message.isUser ? 'Your message' : 'Coach message'}>
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

          {/* Round 1: Choose Savings Goal */}
          {step === 'round1' && !showTyping && (
            <div className="grid grid-cols-1 gap-3 pt-4 animate-slide-up" role="group" aria-label="Choose your savings goal">
              <Button
                onClick={() => handleGoalSelect('emergency', t.goal1)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
                aria-label={`Choose goal: ${t.goal1}`}
              >
                <span className="text-2xl mb-1" aria-hidden="true">💰</span>
                <span className="font-semibold">{t.goal1}</span>
              </Button>
              <Button
                onClick={() => handleGoalSelect('vacation', t.goal2)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">✈️</span>
                <span className="font-semibold">{t.goal2}</span>
              </Button>
              <Button
                onClick={() => handleGoalSelect('downpayment', t.goal3)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">🏠</span>
                <span className="font-semibold">{t.goal3}</span>
              </Button>
            </div>
          )}

          {/* Round 2: Biggest Pain Point */}
          {step === 'round2' && !showTyping && (
            <div className="grid grid-cols-1 gap-3 pt-4 animate-slide-up">
              <Button
                onClick={() => handlePainPointSelect('fomo', t.painPoint1)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">😢</span>
                <span className="font-semibold">{t.painPoint1}</span>
              </Button>
              <Button
                onClick={() => handlePainPointSelect('unexpected', t.painPoint2)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">⚡</span>
                <span className="font-semibold">{t.painPoint2}</span>
              </Button>
              <Button
                onClick={() => handlePainPointSelect('irregular', t.painPoint3)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">📊</span>
                <span className="font-semibold">{t.painPoint3}</span>
              </Button>
            </div>
          )}

          {/* Round 3: Commitment Level */}
          {step === 'round3' && !showTyping && (
            <div className="grid grid-cols-1 gap-3 pt-4 animate-slide-up">
              <Button
                onClick={() => handleCommitmentSelect('aggressive', t.commitment1)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">🚀</span>
                <span className="font-semibold">{t.commitment1}</span>
              </Button>
              <Button
                onClick={() => handleCommitmentSelect('moderate', t.commitment2)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">🎯</span>
                <span className="font-semibold">{t.commitment2}</span>
              </Button>
              <Button
                onClick={() => handleCommitmentSelect('cautious', t.commitment3)}
                variant="outline"
                className="h-20 text-sm font-medium hover:border-primary hover:bg-primary/5 flex flex-col items-start justify-center p-4"
              >
                <span className="text-2xl mb-1">🌱</span>
                <span className="font-semibold">{t.commitment3}</span>
              </Button>
            </div>
          )}

          {/* Continue Button */}
          {step === 'complete' && (
            <div className="pt-4 animate-slide-up">
              <Button
                onClick={handleContinue}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all"
                size="lg"
                aria-label="Continue to your personalized dashboard"
              >
                {t.continueToDashboard} <span aria-hidden="true">✨</span>
              </Button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        {step !== 'complete' && (
          <Card className="bg-muted/50 border-0 mt-8" role="note" aria-label="Disclaimer">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                {translations[userData.language].coach.disclaimer}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default GoalSetting;
