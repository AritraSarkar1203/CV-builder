import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create your professional CV in minutes, not hours',
    },
    {
      icon: Award,
      title: 'ATS Optimized',
      description: 'Get past applicant tracking systems with smart formatting',
    },
    {
      icon: CheckCircle2,
      title: 'Easy to Use',
      description: 'Intuitive interface that makes CV building effortless',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CV Builder</span>
          </div>
          <Button variant="ghost" className="hover:bg-muted">
            Sign In
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-6 shadow-soft">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Build Your Dream{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Career
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Create a professional CV that stands out. Import your data from LinkedIn or GitHub
            and land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 shadow-glow transition-all hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-muted"
            >
              View Examples
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-glow transition-all hover:scale-105"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
