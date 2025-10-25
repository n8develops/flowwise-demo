import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";

const Pitch = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const t = translations[userData.language].pitch;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8 animate-slide-up">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          {t.headline}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl mx-auto">
          {t.tagline}
        </p>
        <Button
          onClick={() => navigate('/dashboard')}
          size="lg"
          className="h-16 px-8 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
        >
          {t.seeDashboard}
        </Button>
      </div>
    </div>
  );
};

export default Pitch;
