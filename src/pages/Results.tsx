import { ArrowLeft, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DropdownButton } from '../components/DropdownButton';
import jsPDF from 'jspdf';
import type { Flag } from '../lib/types';
import { motion } from 'framer-motion';


interface LocationState {
  text: string;
  flags: Flag[];
  overallToxicity: number;
  summary: {
    spamScore: number;
    toxicityScore: number;
    profanityCount: number;
    emotionalIntensity: number;
    threatLevel: number;
    manipulationScore: number;
    credibilityScore: number;
  };
}

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/moderate-text');
    return null;
  }

  const { text, flags, overallToxicity, summary } = state;

  const getTypeColor = (type: Flag['type']) => {
    switch (type) {
      case 'neutral': return 'bg-white/10 text-white';
      case 'spam': return 'bg-gray-500/10 text-gray-300';
      case 'hate_speech': return 'bg-zinc-500/10 text-zinc-300';
      case 'threat': return 'bg-gray-600/10 text-gray-300';
      case 'personal_attack': return 'bg-zinc-600/10 text-zinc-300';
      case 'harassment': return 'bg-red-500/10 text-red-300';
      case 'explicit_content': return 'bg-rose-500/10 text-rose-300';
      case 'misinformation': return 'bg-blue-500/10 text-blue-300';
      case 'self_harm': return 'bg-purple-600/10 text-purple-300';
      case 'violence': return 'bg-red-600/10 text-red-300';
      case 'emotional_manipulation': return 'bg-indigo-500/10 text-indigo-300';
      case 'profanity': return 'bg-orange-600/10 text-orange-300';
      case 'hate_group': return 'bg-purple-800/10 text-purple-300';
      case 'conspiracy': return 'bg-blue-600/10 text-blue-300';
      case 'impersonation': return 'bg-teal-500/10 text-teal-300';
      case 'trolling': return 'bg-amber-500/10 text-amber-300';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getToxicityLevel = (score: number) => {
    if (score >= 0.8) return 'High Risk';
    if (score >= 0.5) return 'Medium Risk';
    return 'Low Risk';
  };

  const getToxicityColor = (score: number) => {
    if (score >= 0.8) return 'text-red-400';
    if (score >= 0.5) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleDownload = (format: 'pdf' | 'json') => {
    if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Content Moderation Report', 20, 20);
      
      // Add analyzed text
      doc.setFontSize(12);
      doc.text('Analyzed Text:', 20, 40);
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, 50);
      
      // Add flags
      doc.setFontSize(12);
      doc.text('Detected Issues:', 20, 90);
      flags.forEach((flag, index) => {
        const yPos = 100 + (index * 10);
        doc.text(`${flag.type}: ${flag.reason} (${Math.round(flag.confidence * 100)}% confidence)`, 20, yPos);
      });
      
      // Add summary
      doc.setFontSize(12);
      const summaryY = Math.min(200, 110 + (flags.length * 10));
      doc.text('Summary:', 20, summaryY);
      doc.text(`Overall Toxicity: ${Math.round(overallToxicity * 100)}%`, 20, summaryY + 10);
      doc.text(`Spam Score: ${Math.round(summary.spamScore * 100)}%`, 20, summaryY + 20);
      doc.text(`Profanity Count: ${summary.profanityCount}`, 20, summaryY + 30);
      doc.text(`Emotional Intensity: ${Math.round(summary.emotionalIntensity * 100)}%`, 20, summaryY + 40);
      
      doc.save('moderation-report.pdf');
    } else {
      const jsonData = JSON.stringify({ text, flags, overallToxicity, summary }, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moderation-report.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const MetricsGraph = ({ summary }: { summary: LocationState['summary'] }) => {
    const metrics = [
      { label: 'Toxicity', value: summary.toxicityScore * 100, color: 'from-red-500 to-red-600' },
      { label: 'Threat', value: summary.threatLevel * 100, color: 'from-orange-500 to-orange-600' },
      { label: 'Emotional', value: summary.emotionalIntensity * 100, color: 'from-purple-500 to-purple-600' },
      { label: 'Manipulation', value: summary.manipulationScore * 100, color: 'from-blue-500 to-blue-600' },
      { label: 'Credibility', value: summary.credibilityScore * 100, color: 'from-green-500 to-green-600' }
    ];

    return (
      <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl mt-8">
        <h2 className="text-[32px] font-semibold tracking-tight mb-8">Metrics Analysis</h2>
        <div className="space-y-8">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[17px] font-medium text-neutral-400">{metric.label}</span>
                <span className="text-[21px] font-semibold">{Math.round(metric.value)}%</span>
              </div>
              <div className="h-[6px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.15,
                    ease: [0.42, 0, 0.58, 1] // Apple's custom easing
                  }}
                  className={`h-full bg-gradient-to-r ${metric.color} relative group`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/moderate-text', { state: { text } })}
        >
          Back to Input
        </Button>
        
        <DropdownButton
          icon={Download}
          items={[
            { label: 'Download PDF', onClick: () => handleDownload('pdf') },
            { label: 'Download JSON', onClick: () => handleDownload('json') }
          ]}
        >
          Download Report
        </DropdownButton>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Moderation Results</h1>
          <div className="flex items-center space-x-2">
            <p className="text-gray-400">
              Found {flags.length} potential {flags.length === 1 ? 'issue' : 'issues'}
            </p>
            <span className="text-gray-400">•</span>
            <p className={getToxicityColor(overallToxicity)}>
              {getToxicityLevel(overallToxicity)} ({Math.round(overallToxicity * 100)}% toxicity)
            </p>
          </div>
        </div>

        {/* Display the analyzed text */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Analyzed Text</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{text}</p>
        </div>

        {/* Display flags */}
        {flags.length > 0 && (
          <div className="bg-white/5 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Detected Issues</h2>
            <div className="space-y-4">
              {flags.map((flag, index) => (
                <div key={index} className={`p-4 rounded-lg ${getTypeColor(flag.type)}`}>
                  <div className="font-semibold mb-1 capitalize">
                    {flag.type.replace(/_/g, ' ')}
                  </div>
                  <p className="text-sm opacity-90">{flag.reason}</p>
                  {flag.context && (
                    <p className="text-sm mt-2 opacity-75">
                      Context: "{flag.context}"
                    </p>
                  )}
                  <div className="text-sm mt-2 opacity-75">
                    Confidence: {Math.round(flag.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <MetricsGraph summary={summary} />

        {/* Display summary */}
        <div className="bg-white/5 p-6 rounded-xl mt-8">
          <h2 className="text-xl font-semibold mb-6">Analysis Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Toxicity Score</div>
              <div className={`text-xl font-semibold ${getToxicityColor(summary.toxicityScore)}`}>
                {Math.round(summary.toxicityScore * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Spam Score</div>
              <div className="text-xl font-semibold text-yellow-400">
                {Math.round(summary.spamScore * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Profanity Count</div>
              <div className="text-xl font-semibold text-red-400">
                {summary.profanityCount}
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Emotional Intensity</div>
              <div className="text-xl font-semibold text-purple-400">
                {Math.round(summary.emotionalIntensity * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Threat Level</div>
              <div className="text-xl font-semibold text-orange-400">
                {Math.round(summary.threatLevel * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Manipulation Score</div>
              <div className="text-xl font-semibold text-indigo-400">
                {Math.round(summary.manipulationScore * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Credibility Score</div>
              <div className="text-xl font-semibold text-emerald-400">
                {Math.round(summary.credibilityScore * 100)}%
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Overall Risk</div>
              <div className={`text-xl font-semibold ${getToxicityColor(overallToxicity)}`}>
                {getToxicityLevel(overallToxicity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
