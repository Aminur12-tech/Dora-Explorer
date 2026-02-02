import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Maximize2 } from 'lucide-react';

interface LanguageCardProps {
  english: string;
  assamese: string;
  phonetic: string;
}

export const LanguageCard = ({ english, assamese, phonetic }: LanguageCardProps) => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="language-card"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-muted-foreground mb-1">English</p>
            <p className="text-lg font-semibold text-foreground">{english}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors">
              <Volume2 className="w-4 h-4 text-primary" />
            </button>
            <button 
              onClick={() => setShowFullScreen(true)}
              className="p-2 rounded-full bg-muted hover:bg-secondary/20 transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-secondary" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-border pt-3 mt-3">
          <p className="text-sm text-muted-foreground mb-1">Assamese</p>
          <p className="text-xl font-medium text-primary mb-1">{phonetic}</p>
          <p className="text-2xl text-foreground">{assamese}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center p-8"
            onClick={() => setShowFullScreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="text-center"
            >
              <p className="text-primary-foreground/70 text-xl mb-4">{english}</p>
              <p className="text-6xl md:text-8xl font-bold text-primary-foreground mb-6">
                {assamese}
              </p>
              <p className="text-3xl md:text-4xl text-secondary">
                {phonetic}
              </p>
              <p className="text-primary-foreground/50 mt-8 text-sm">
                Tap anywhere to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
