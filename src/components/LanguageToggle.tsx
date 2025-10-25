import { useUserStore } from "@/stores/userStore";
import { Button } from "./ui/button";

export const LanguageToggle = () => {
  const { userData, setLanguage } = useUserStore();

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant={userData.language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="font-medium"
        aria-label="Switch to English"
      >
        English
      </Button>
      <span className="text-muted-foreground">|</span>
      <Button
        variant={userData.language === 'es' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('es')}
        className="font-medium"
        aria-label="Cambiar a Español"
      >
        Español
      </Button>
    </div>
  );
};
