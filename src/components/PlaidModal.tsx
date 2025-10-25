import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface PlaidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlaidModal = ({ open, onOpenChange }: PlaidModalProps) => {
  const [step, setStep] = useState<'select' | 'connecting' | 'success'>('select');
  const { userData, connectBank } = useUserStore();
  const { toast } = useToast();
  const t = translations[userData.language].plaid;

  const banks = [
    { id: 'chase', name: t.chase },
    { id: 'wells', name: t.wellsFargo },
    { id: 'bofa', name: t.bofa },
  ];

  const handleBankSelect = async (bankId: string) => {
    setStep('connecting');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        connectBank();
        onOpenChange(false);
        toast({
          title: t.success,
          description: t.successMessage,
        });
        setStep('select'); // Reset for next time
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {step === 'success' ? t.success : t.selectBank}
          </DialogTitle>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-3 py-4">
            {banks.map((bank) => (
              <Button
                key={bank.id}
                variant="outline"
                className="w-full h-16 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleBankSelect(bank.id)}
              >
                {bank.name}
              </Button>
            ))}
          </div>
        )}

        {step === 'connecting' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-muted-foreground">{t.connecting}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="rounded-full bg-success p-4 mb-4">
              <Check className="h-12 w-12 text-success-foreground" />
            </div>
            <p className="text-lg font-medium">{t.successMessage}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
