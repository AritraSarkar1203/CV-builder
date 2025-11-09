import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Clean layout with bold headings', color: '#7C3AED' },
  { id: 'classic', name: 'Classic', desc: 'Traditional CV look with serif accents', color: '#0EA5A4' },
  { id: 'minimal', name: 'Minimal', desc: 'Space-focused, simple typography', color: '#F97316' },
  { id: 'creative', name: 'Creative', desc: 'Colorful sections and visual flair', color: '#EF4444' },
  { id: 'technical', name: 'Technical', desc: 'Dense skills and project layout', color: '#2563EB' },
];

const STORAGE_KEY = 'cvbuilder:selectedTemplates';

const ResumeTemplates: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch (e) {
      // ignore
    }
  }, [selected]);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const clearAll = () => setSelected([]);

  const navigate = useNavigate();

  const applySelected = () => {
    if (selected.length === 0) {
      alert('No templates selected');
      return;
    }
    // For 'Use Selected' we pick the first selected template as primary
    const primary = selected[0];
    try {
      localStorage.setItem('cvbuilder:activeTemplate', primary);
    } catch (e) {
      // ignore
    }
    navigate('/latex-editor');
  };

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

      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Resume Templates
            <div className="bg-gradient-primary bg-clip-text text-transparent inline-block ml-2">pick one or more</div>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose one or multiple templates to preview or apply to your CV. Selections persist locally.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button onClick={applySelected} disabled={selected.length === 0}>
                Use Selected ({selected.length})
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => {
              const isSelected = selected.includes(t.id);
              return (
                <motion.div
                  key={t.id}
                  className={`rounded-2xl border border-border bg-card p-4 shadow-soft flex flex-col justify-between`} 
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 text-left">
                      <h3 className="font-semibold text-lg">{t.name}</h3>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                    <div>
                      <Checkbox checked={isSelected} onCheckedChange={() => toggle(t.id)} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full h-36 rounded-md overflow-hidden" style={{ background: `linear-gradient(135deg, ${t.color}22, transparent)` }}>
                      <div className="h-full flex items-center justify-center">
                        <div className="w-28 h-36 rounded-sm bg-white/6 border border-white/10 flex items-center justify-center text-sm font-medium text-white/90">
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">ID: {t.id}</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => alert(`Previewing ${t.name}`)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (!isSelected) toggle(t.id);
                          try {
                            // store the chosen template id as the active template and navigate to the editor
                            localStorage.setItem('cvbuilder:activeTemplate', t.id);
                          } catch (e) {
                            // ignore
                          }
                          navigate('/latex-editor');
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeTemplates;
