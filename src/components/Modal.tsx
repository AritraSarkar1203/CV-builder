import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-glow overflow-hidden"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    Get Started
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Connect your account to build your professional CV
                  </p>
                </motion.div>

                {/* Login buttons */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12 border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      onClick={() => console.log('LinkedIn login clicked')}
                    >
                      <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                      <span>Continue with LinkedIn</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12 border-2 hover:border-foreground hover:bg-foreground/5 transition-all"
                      onClick={() => console.log('GitHub login clicked')}
                    >
                      <Github className="h-5 w-5" />
                      <span>Continue with GitHub</span>
                    </Button>
                  </motion.div>
                </div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Step 1 of 3</span>
                    <span>33%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '33%' }}
                      transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-primary"
                    />
                  </div>
                </motion.div>

                {/* Terms */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-muted-foreground text-center mt-6"
                >
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
