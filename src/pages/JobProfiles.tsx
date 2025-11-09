import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const JOB_OPTIONS = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'frontend-engineer', label: 'Frontend Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'designer', label: 'Designer' },
];

const JobProfiles: React.FC = () => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [list, setList] = useState<{ value: string; label: string }[]>([]);

  const addProfile = () => {
    if (!selected) return;
    const found = JOB_OPTIONS.find((o) => o.value === selected);
    if (!found) return;
    if (list.some((l) => l.value === found.value)) return; // avoid duplicates
    setList((s) => [...s, found]);
    setSelected(undefined);
  };

  const removeProfile = (value: string) => setList((s) => s.filter((i) => i.value !== value));

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header (matches Home) */}
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

      {/* Page Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Choose Job Profiles
            <div className="bg-gradient-primary bg-clip-text text-transparent inline-block ml-2">for your CV</div>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the job profiles you want to target. These will help tailor sections of your CV.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="p-6 rounded-2xl border border-border bg-card shadow-soft"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(8px)' }}
          >
            <label className="block mb-2 text-sm font-medium">Choose a job profile</label>
            <Select onValueChange={(v) => setSelected(v)} value={selected}>
              <SelectTrigger className="h-12 px-4 rounded-xl border-2 border-transparent bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/20 shadow-md flex items-center">
                <div className="flex items-center gap-3 w-full">
                  <svg className="w-5 h-5 text-primary-foreground opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M2 7v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7" />
                    <path d="M16 3h-8v4h8V3z" />
                  </svg>
                  <SelectValue placeholder="Select a job profile" />
                </div>
              </SelectTrigger>
              <SelectContent className="min-w-[16rem]">
                {JOB_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button onClick={addProfile} disabled={!selected}>
                Add
              </Button>
              <Button variant="outline" onClick={() => { setSelected(undefined); setList([]); }}>
                Clear All
              </Button>
            </div>

            <div className="mt-6 text-left">
              <h2 className="font-semibold mb-2">Selected Profiles</h2>
              {list.length === 0 ? (
                <p className="text-sm text-muted-foreground">No profiles added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {list.map((item) => (
                    <li key={item.value} className="flex items-center justify-between border p-2 rounded-md">
                      <span>{item.label}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeProfile(item.value)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default JobProfiles;
