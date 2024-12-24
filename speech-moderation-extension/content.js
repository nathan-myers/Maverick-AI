let recognition = null;
let isRecognitionActive = false;

function initializeSpeechRecognition() {
  try {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = handleRecognitionResult;
    recognition.onerror = (event) => {
      showMessage(`Error: ${event.error}`);
    };
    recognition.onend = () => {
      showMessage('Recognition ended');
      isRecognitionActive = false;
    };
    
    return true;
  } catch (e) {
    console.error('Speech recognition initialization failed:', e);
    return false;
  }
}

function handleRecognitionResult(event) {
  const results = event.results;
  for (let i = event.resultIndex; i < results.length; i++) {
    const result = results[i];
    const text = result[0].transcript;
    const isFinal = result.isFinal;
    showMessage(text, isFinal);
  }
}

function getOrCreateContainer() {
  let container = document.getElementById('speech-transcript-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'speech-transcript-container';
    container.className = 'maverick-chat';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'maverick-chat-header';
    header.innerHTML = `
      <span>Speech Recognition</span>
      <button class="close-button">×</button>
    `;
    
    // Create messages container
    const messages = document.createElement('div');
    messages.id = 'speech-content';
    messages.className = 'maverick-chat-messages';
    
    container.appendChild(header);
    container.appendChild(messages);
    document.body.appendChild(container);
    
    // Add close button functionality
    header.querySelector('.close-button').addEventListener('click', () => {
      container.remove();
    });
  }
  return container;
}

function showMessage(text, isFinal = false) {
  const container = getOrCreateContainer();
  const contentEl = container.querySelector('#speech-content');
  
  // Create new message element
  const msgEl = document.createElement('div');
  msgEl.className = 'message';
  
  // Clean up the text by removing "Heard: " and quotes
  const cleanText = text.replace(/^Heard: /, '').replace(/['"]/g, '');
  
  msgEl.innerHTML = `
    <div class="message-content ${isFinal ? 'final-text' : 'interim-text'}">
      ${cleanText}
    </div>
    <div class="message-meta">
      <span class="message-status">${isFinal ? 'Final' : 'Interim'}</span>
      <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    </div>
  `;
  
  contentEl.appendChild(msgEl);
  contentEl.scrollTop = contentEl.scrollHeight;
}

function startSpeechRecognition() {
  if (!recognition) {
    const initSuccessful = initializeSpeechRecognition();
    if (!initSuccessful) {
      showMessage('Initialization failed. Cannot start.');
      return;
    }
  }

  if (!isRecognitionActive) {
    isRecognitionActive = true;
    showMessage('Starting speech recognition...');
    try {
      recognition.start();
      showMessage('Listening... Please speak.');
    } catch (e) {
      console.error(e);
      showMessage('Error starting recognition: ' + e.message);
    }
  } else {
    showMessage('Speech recognition already active.');
  }
}

function stopSpeechRecognition() {
  if (recognition && isRecognitionActive) {
    isRecognitionActive = false;
    recognition.stop();
    showMessage('Stopped listening.');
  } else {
    showMessage('Recognition not active or not initialized.');
  }
}

// Make functions available globally
window.startSpeechRecognition = startSpeechRecognition;
window.stopSpeechRecognition = stopSpeechRecognition;

// Inject styles
function injectStyles() {
  // Check if styles are already injected
  const existingStyles = document.getElementById('maverick-chat-styles');
  if (existingStyles) {
    return;
  }

  const styleSheet = document.createElement('style');
  styleSheet.id = 'maverick-chat-styles';
  styleSheet.textContent = `
    .maverick-chat {
      position: fixed !important;
      right: 20px !important;
      bottom: 20px !important;
      width: 400px !important;
      max-height: 600px !important;
      background: rgba(0, 0, 0, 0.85) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
      z-index: 999999 !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      color: white !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .maverick-chat-header {
      padding: 16px !important;
      background: rgba(255, 255, 255, 0.05) !important;
      border-radius: 16px 16px 0 0 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    .maverick-chat-header span {
      font-weight: 600 !important;
      color: white !important;
    }

    .maverick-chat-messages {
      padding: 16px !important;
      max-height: 500px !important;
      overflow-y: auto !important;
      flex-grow: 1 !important;
    }

    .message {
      margin-bottom: 12px !important;
      padding: 12px !important;
      background: rgba(255, 255, 255, 0.05) !important;
      border-radius: 12px !important;
    }

    .message-content {
      color: rgba(255, 255, 255, 0.9) !important;
      line-height: 1.5 !important;
    }

    .final-text {
      color: #22c55e !important;
    }

    .interim-text {
      color: #f59e0b !important;
    }

    .close-button {
      background: none !important;
      border: none !important;
      color: rgba(255, 255, 255, 0.6) !important;
      font-size: 20px !important;
      cursor: pointer !important;
      padding: 4px !important;
    }

    .close-button:hover {
      color: white !important;
    }
  `;

  // Insert styles into document head
  document.head.appendChild(styleSheet);
}

// Initialize styles when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStyles);
} else {
  injectStyles();
}
