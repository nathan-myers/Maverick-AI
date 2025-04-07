import { useState } from 'react';
import { Button } from './Button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      console.error('Copy functionality is not supported in this browser');
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <Button 
        onClick={handleCopy} 
        variant="secondary" 
        icon={copied ? Check : Copy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}