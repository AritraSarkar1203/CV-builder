import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

// Import template sources as raw strings (Vite supports '?raw')
import modernTex from '@/templates/modern.tex?raw';
import classicTex from '@/templates/classic.tex?raw';
import minimalTex from '@/templates/minimal.tex?raw';
import creativeTex from '@/templates/creative.tex?raw';
import technicalTex from '@/templates/technical.tex?raw';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', src: modernTex },
  { id: 'classic', name: 'Classic', src: classicTex },
  { id: 'minimal', name: 'Minimal', src: minimalTex },
  { id: 'creative', name: 'Creative', src: creativeTex },
  { id: 'technical', name: 'Technical', src: technicalTex },
];

// Backend integration removed from the client. All compilation should be done
// outside this React app (e.g. the Tectonic client in D:\\Synhack\\client).
// Keep everything local-browser-only in this frontend.

const LatexEditor: React.FC = () => {
  const [selected, setSelected] = useState<string>('modern');
  const [source, setSource] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const t = TEMPLATES.find((x) => x.id === selected);
    setSource(t?.src ?? '');
  }, [selected]);

  // If a template was applied from the templates page, load it on mount
  useEffect(() => {
    try {
      const active = localStorage.getItem('cvbuilder:activeTemplate');
      if (active) {
        const t = TEMPLATES.find((x) => x.id === active);
        if (t) {
          setSelected(t.id);
          setSource(t.src);
        }
        // clear the active key so subsequent visits are not forced
        localStorage.removeItem('cvbuilder:activeTemplate');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const templateOptions = useMemo(() => TEMPLATES.map((t) => ({ value: t.id, label: t.name })), []);

  // Generate PDF (fallback-only). The Tectonic integration was moved to D:\\Synhack\\client.
  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      // No server-side compilation in this client. Download the .tex source
      // so the user can compile externally.
      const blob = new Blob([source], { type: 'text/x-tex' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selected}.tex`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      alert('No server-side compilation available. .tex file downloaded — compile it with an external LaTeX tool.');
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('PDF generation failed. See console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  const checkBackend = async () => {
    // Backend checks were removed from the client. Inform the user how to
    // run compilation externally instead.
    alert(
      'Backend integration has been removed from the client. To compile LaTeX to PDF, run the separate Tectonic client at D:\\Synhack\\client or use an external LaTeX tool. This page can generate and download .tex files locally.'
    );
  };

  const testCompile = async () => {
    // Server-side compilation has been removed from the client. Provide a
    // local fallback: download the current .tex source so the user can compile
    // it with an external tool.
    try {
      const blob = new Blob([source], { type: 'text/x-tex' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selected}.tex`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      alert('Server-side compile disabled. .tex file downloaded — use a LaTeX tool to produce a PDF.');
    } catch (err: any) {
      alert(`Could not download .tex file: ${err?.message || err}`);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = selected + '.tex';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CV Builder</span>
          </div>
          <Button variant="ghost">Sign In</Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">LaTeX Editor & PDF Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Select a template, edit the LaTeX, and download the .tex source. This frontend no longer performs server-side compilation; use an external LaTeX tool or the separate Tectonic client to produce PDFs.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(8px)' }}>
            <label className="block mb-2 text-sm font-medium">Template</label>
            <Select value={selected} onValueChange={(v) => setSelected(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label className="block mt-4 mb-2 text-sm font-medium">LaTeX Source</label>
            <textarea value={source} onChange={(e) => setSource(e.target.value)} className="w-full h-72 p-3 rounded-md bg-muted/10 text-sm font-mono" />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button onClick={generatePdf} disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Generate PDF'}</Button>
              <Button variant="outline" onClick={() => { setSource(TEMPLATES.find((t) => t.id === selected)?.src ?? ''); }}>Reset Template</Button>
              <Button variant="ghost" onClick={() => { const blob = new Blob([source], { type: 'text/x-tex' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${selected}.tex`; document.body.appendChild(a); a.click(); a.remove(); }}>Download .tex</Button>
              <Button variant="ghost" onClick={checkBackend}>Check backend</Button>
              <Button variant="outline" onClick={testCompile}>Test /api/compile</Button>
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              <strong>Integration notes:</strong>
              <ul className="list-disc ml-5">
                <li>Tectonic client code moved to <code>D:\\Synhack\\client</code>. For production it's recommended to run compilation server-side and return PDF bytes.</li>
                <li>Use the <em>Test /api/compile</em> button to download the current .tex source so you can compile it with an external LaTeX tool.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(8px)' }}>
            <h3 className="font-semibold mb-3">Preview / Output</h3>
            {pdfUrl ? (
              <>
                <div className="border rounded-md overflow-hidden">
                  <object data={pdfUrl} type="application/pdf" width="100%" height="480">Your browser does not support PDF preview.</object>
                </div>
                <div className="mt-3 flex gap-3">
                  <Button onClick={downloadPdf}>Download</Button>
                  <Button variant="outline" onClick={() => { URL.revokeObjectURL(pdfUrl); setPdfUrl(null); }}>Close</Button>
                </div>
              </>
            ) : (
              <div className="h-72 flex items-center justify-center text-sm text-muted-foreground border rounded-md">No PDF generated yet. Press "Generate PDF" to create one (or download the .tex file).</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LatexEditor;
