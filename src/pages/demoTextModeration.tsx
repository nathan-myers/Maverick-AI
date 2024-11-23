import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { moderateText } from '../lib/moderation';

interface AnalysisResult {
  // Define the structure of the analysis result
  [key: string]: any;
}

export function ModerateText() {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState<string>(location?.state?.text || '');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError('');

    try {
      const result: AnalysisResult = await moderateText(text);
      if (!result) {
        throw new Error('No analysis results received');
      }
      setResult(result);
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

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          let fileText = e.target?.result as string;
          if (file.type === 'application/json') {
            const json = JSON.parse(fileText);
            if (typeof json !== 'object' || json === null || !json.text) {
              throw new Error('Invalid JSON format. "text" field is required.');
            }
            fileText = json.text;
          }
          setText(fileText);
        } catch (error) {
          setError(error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis_result.json';
      a.click();
      URL.revokeObjectURL(url);
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

        <input 
          type="file" 
          onChange={handleFileUpload} 
          className="mb-4"
        />

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
            variant="secondary"
            onClick={() => setText('')}
          >
            Clear Text
          </Button>
        </div>

        {result && (
          <Button
            variant="primary"
            onClick={handleDownload}
            className="mt-4"
          >
            Download Result
          </Button>
        )}
      </div>
    </div>
  );
}