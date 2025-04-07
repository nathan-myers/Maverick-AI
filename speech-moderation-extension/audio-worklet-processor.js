class SpeechAnalyzerProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.isProcessing = false;
    this.bufferSize = 2048;
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || !input.length) return true;

    const inputChannel = input[0];
    
    // Process audio data
    for (let i = 0; i < inputChannel.length; i++) {
      this.buffer[this.bufferIndex] = inputChannel[i];
      this.bufferIndex++;

      if (this.bufferIndex >= this.bufferSize) {
        // Send buffer for analysis
        this.port.postMessage({
          type: 'audioData',
          data: this.buffer.slice()
        });
        
        // Reset buffer
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor('speech-analyzer-processor', SpeechAnalyzerProcessor);
