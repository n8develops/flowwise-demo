import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { ArrowLeft, Lock, Brain, MessageCircle, Globe } from "lucide-react";

const Transparency = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const t = translations[userData.language].transparency;

  const points = [
    { icon: Lock, text: t.point1 },
    { icon: Brain, text: t.point2 },
    { icon: MessageCircle, text: t.point3 },
    { icon: Globe, text: t.point4 },
  ];

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
          <h1 className="text-2xl font-bold">{t.title}</h1>
        </div>

        {/* Points */}
        <div className="space-y-4 animate-fade-in">
          {points.map((point, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                    <point.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-base leading-relaxed pt-2">
                    {point.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate('/dashboard')}
          className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all mt-8"
          size="lg"
        >
          {t.backToDashboard}
        </Button>
      </div>
    </div>
  );
};

export default Transparency;
