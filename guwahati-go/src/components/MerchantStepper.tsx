import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface MerchantStepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const MerchantStepper = ({ 
  currentStep, 
  totalSteps, 
  stepLabels 
}: MerchantStepperProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`stepper-step ${
                step < currentStep 
                  ? 'completed' 
                  : step === currentStep 
                    ? 'active' 
                    : 'pending'
              }`}
            >
              {step < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{step}</span>
              )}
            </motion.div>
            <span className={`text-xs mt-2 font-medium ${
              step <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {stepLabels[index]}
            </span>
          </div>
          
          {index < totalSteps - 1 && (
            <div className="flex-1 h-0.5 mx-2 mt-[-1.5rem]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step < currentStep ? 1 : 0 }}
                className="h-full bg-success origin-left"
                transition={{ duration: 0.3 }}
              />
              <div className="h-full bg-muted -mt-0.5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
