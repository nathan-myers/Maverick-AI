import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { moderateText } from '../lib/moderation';

const gradientAnimation = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export function ModerateText() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError("");

    try {
      const result = await moderateText(text);
      if (!result) {
        throw new Error('No analysis results received');
      }
      navigate('/results', { state: result });
    } catch (err) {
      setError("Failed to analyze text. Please try again.");
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <style>{gradientAnimation}</style>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Content Moderation Tool
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 mb-8"
        >
          Enter your text below to check for any offensive or inappropriate content.
        </motion.p>

        {/* Text Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            disabled={isAnalyzing}
          />
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className={`
              px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2
              bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
              hover:from-blue-600 hover:via-purple-600 hover:to-blue-600
              text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]
              hover:shadow-[0_0_25px_rgba(79,70,229,0.45)]
              animate-[gradient_8s_ease_infinite]
              bg-[length:200%_200%]
              ${(!text.trim() || isAnalyzing) && "opacity-50 cursor-not-allowed"}
            `}
          >
            {isAnalyzing && <Loader2 className="w-5 h-5 animate-spin" />}
            {isAnalyzing ? "Analyzing..." : "Analyze Text"}
          </button>

          <button
            onClick={handleClear}
            disabled={!text.trim()}
            className={`bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors ${
              !text.trim() && "opacity-50 cursor-not-allowed"
            }`}
          >
            Clear Text
          </button>
        </div>
      </div>
    </main>
  );
}