import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { ArrowLeft, Lightbulb, ShieldAlert } from "lucide-react";

const Learning = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const learningT = translations[userData.language].learning;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-2xl mx-auto p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {learningT.backToDashboard || "Back"}
          </Button>
          <LanguageToggle />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-3 py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg mb-4">
            <Lightbulb className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {learningT.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {learningT.subtitle || "Build better money habits"}
          </p>
        </div>

        {/* FOMO Card */}
        <Card className="relative overflow-hidden border-none shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent" />
          <div className="relative p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {learningT.fomoTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {learningT.fomoContent}
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-[72px]">
              {[learningT.fomoTip1, learningT.fomoTip2, learningT.fomoTip3].map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover:translate-x-1"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed pt-0.5">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Unexpected Card */}
        <Card className="relative overflow-hidden border-none shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-destructive/5 to-transparent" />
          <div className="relative p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-destructive flex items-center justify-center shadow-lg">
                <ShieldAlert className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {learningT.unexpectedTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {learningT.unexpectedContent}
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-[72px]">
              {[learningT.unexpectedTip1, learningT.unexpectedTip2, learningT.unexpectedTip3].map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all hover:translate-x-1"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-destructive flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed pt-0.5">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="pt-4 pb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full h-14 text-lg font-semibold shadow-xl"
            size="lg"
          >
            {learningT.backToDashboard || "Back to Dashboard"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
