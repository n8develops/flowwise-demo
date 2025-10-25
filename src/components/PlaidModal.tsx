import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useUserStore } from "@/stores/userStore";
import { translations } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle } from "lucide-react";

interface PlaidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlaidModal = ({ open, onOpenChange }: PlaidModalProps) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [step, setStep] = useState<'loading' | 'ready' | 'connecting' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { userData, connectBank } = useUserStore();
  const { toast } = useToast();
  const t = translations[userData.language].plaid;

  // Fetch link token when modal opens
  useEffect(() => {
    if (open && !linkToken) {
      fetchLinkToken();
    }
  }, [open]);

  const fetchLinkToken = async () => {
    try {
      setStep('loading');
      const response = await fetch('https://pxglgxmcxaduyfuwwnxy.supabase.co/functions/v1/create-link-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize Plaid');
      }

      setLinkToken(data.link_token);
      setStep('ready');
    } catch (error) {
      console.error('Error fetching link token:', error);
      setStep('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to initialize Plaid');
    }
  };

  const onSuccess = useCallback(async (public_token: string) => {
    try {
      setStep('connecting');
      
      const response = await fetch('https://pxglgxmcxaduyfuwwnxy.supabase.co/functions/v1/exchange-public-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect bank');
      }

      setStep('success');
      setTimeout(() => {
        connectBank();
        onOpenChange(false);
        toast({
          title: t.success,
          description: t.successMessage,
        });
        // Reset for next time
        setLinkToken(null);
        setStep('loading');
      }, 1500);
    } catch (error) {
      console.error('Error exchanging token:', error);
      setStep('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect bank');
    }
  }, [connectBank, onOpenChange, t.success, t.successMessage, toast]);

  const { open: openPlaid, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {step === 'success' ? t.success : t.selectBank}
          </DialogTitle>
        </DialogHeader>

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        )}

        {step === 'ready' && (
          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              Connect your bank account securely through Plaid
            </p>
            <Button
              variant="default"
              className="w-full h-16 text-lg"
              onClick={() => openPlaid()}
              disabled={!ready}
            >
              {t.selectBank}
            </Button>
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

        {step === 'error' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <p className="text-lg font-medium text-destructive mb-2">Connection Failed</p>
            <p className="text-sm text-muted-foreground text-center mb-4">{errorMessage}</p>
            <Button onClick={fetchLinkToken} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
