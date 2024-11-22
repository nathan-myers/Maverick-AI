import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { moderateText } from '../lib/moderation';

export function ModerateText() {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(location?.state?.text || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError('');

    try {
      const result = await moderateText(text);
      if (!result) {
        throw new Error('No analysis results received');
      }
      navigate('/results', { state: result });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to analyze text. Please check your API key and try again.';
      console.error('Analysis error:', error);
      setError(errorMessage);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Button 
        variant="secondary"
        icon={ArrowLeft}
        onClick={() => navigate('/')}
        className="mb-8"
      >
        Back to Home
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Moderation Tool</h1>
          <p className="text-gray-400">
            Enter your text below to check for any offensive or inappropriate content.
          </p>
        </div>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          disabled={isAnalyzing}
          error={error}
        />
        <div className="flex items-center justify-between"> 
          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            icon={isAnalyzing ? Loader2 : undefined}
            iconClassName={isAnalyzing ? 'animate-spin' : ''}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </Button>

          <Button
          variant = "secondary"
            onClick={() => setText('')}
          >
            Clear Text
          </Button>
        </div>
        
      </div>
    </div>
  );
}