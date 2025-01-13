let recognition = null;
let isRecognitionActive = false;

function initializeSpeechRecognition() {
  try {
    // Create new recognition instance if null
    if (!recognition) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
    }
    
    // Always reattach event listeners when initializing
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
    
    // Send final text for moderation
    if (isFinal) {
      moderateTranscript(text);
    }
  }
}

async function moderateTranscript(text, participantId = 'self') {
  try {
    const result = await chrome.runtime.sendMessage({
      action: 'moderateText',
      text: text,
      participantId: participantId
    });

    if (!result) {
      console.error('No moderation result received');
      return;
    }

    removeExistingModeration(text, participantId);
    showModerationResult(text, result, participantId);
  } catch (error) {
    console.error('Failed to moderate text:', error);
  }
}

function removeExistingModeration(text) {
  const container = getOrCreateContainer();
  const contentEl = container.querySelector('#speech-content');
  const messages = contentEl.querySelectorAll('.message');
  
  messages.forEach(msg => {
    const msgText = msg.querySelector('.message-content')?.textContent?.trim();
    if (msgText === text && msg.classList.contains('moderation-result')) {
      msg.remove();
    }
  });
}

function showModerationResult(text, moderationResult, participantId = 'self') {
  if (!moderationResult || typeof moderationResult !== 'object') {
    console.error('Invalid moderation result:', moderationResult);
    return;
  }

  const container = getOrCreateContainer();
  const contentEl = container.querySelector('#speech-content');
  
  const msgEl = document.createElement('div');
  msgEl.className = 'message moderation-result';
  
  const toxicity = moderationResult.overallToxicity || 0;
  const flags = moderationResult.flags || [];
  
  const textLower = text.toLowerCase();
  const selfHarmPatterns = ['kill myself', 'suicide', 'self harm', 'end my life'];
  const threatPatterns = ['kill', 'murder', 'hurt', 'harm'];
  
  const hasSelfHarm = selfHarmPatterns.some(pattern => textLower.includes(pattern));
  const hasThreats = threatPatterns.some(pattern => textLower.includes(pattern));
  
  if (hasSelfHarm || hasThreats) {
    flags.push({
      type: hasSelfHarm ? 'self_harm' : 'threat',
      reason: hasSelfHarm ? 'Content contains self-harm references' : 'Content contains threats',
      confidence: 0.95,
      severity: 'high'
    });
  }

  const toxicityLevel = getToxicityLevel(toxicity);
  const toxicityColor = getToxicityColorClass(toxicity);
  
  const flagsHtml = flags
    .map(flag => {
      if (!flag || !flag.type) return '';
      return `
        <div class="flag ${flag.severity || 'low'}">
          <span class="flag-type">${(flag.type || 'unknown').replace(/_/g, ' ')}</span>
          ${flag.reason ? `<span class="flag-reason">${flag.reason}</span>` : ''}
          <span class="flag-confidence">${Math.round((flag.confidence || 0) * 100)}%</span>
        </div>
      `;
    })
    .filter(html => html !== '')
    .join('');

  msgEl.innerHTML = `
    <div class="message-content">
      <div class="participant-id">${participantId === 'self' ? 'You' : `Participant ${participantId}`}</div>
      <div class="moderated-text ${toxicityColor}">
        ${text}
      </div>
      <div class="moderation-flags">
        ${flagsHtml || '<div class="flag low"><span class="flag-type">neutral</span></div>'}
      </div>
      <div class="message-meta">
        <span class="message-status">Moderated</span>
        <span class="toxicity-level ${toxicityColor}">
          ${toxicityLevel} (${Math.round(toxicity * 100)}%)
        </span>
        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  `;
  
  contentEl.appendChild(msgEl);
  contentEl.scrollTop = contentEl.scrollHeight;
}

function getToxicityLevel(toxicity) {
  if (toxicity < 0.3) return 'Safe';
  if (toxicity < 0.7) return 'Moderate';
  return 'High Risk';
}

function getToxicityColorClass(toxicity) {
  if (toxicity < 0.3) return 'low-toxicity';
  if (toxicity < 0.7) return 'medium-toxicity';
  return 'high-toxicity';
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

function isMicrophoneMuted() {
  const muteButton = document.querySelector('[aria-label*="Turn off microphone"], [aria-label*="Turn on microphone"]');
  if (!muteButton) return false;
  return muteButton.getAttribute('aria-label').includes('Turn on microphone');
}

let mutationObserver = null;

function setupMuteObserver() {
  if (mutationObserver) {
    mutationObserver.disconnect();
  }

  mutationObserver = new MutationObserver(() => {
    const isMuted = isMicrophoneMuted();
    
    if (isMuted && isRecognitionActive) {
      stopSpeechRecognition();
      showMessage('Recognition stopped: Microphone muted');
    } else if (!isMuted && !isRecognitionActive) {
      // Automatically restart recognition when unmuted
      startSpeechRecognition();
      showMessage('Recognition restarted: Microphone unmuted');
    }
  });

  // Observe mute button for changes
  const muteButton = document.querySelector('[aria-label*="microphone"]');
  if (muteButton) {
    mutationObserver.observe(muteButton, {
      attributes: true,
      attributeFilter: ['aria-label']
    });
  }
}

function startSpeechRecognition() {
  // Initialize recognition for self
  const initSuccessful = initializeSpeechRecognition();
  if (!initSuccessful) {
    showMessage('Initialization failed. Cannot start.');
    return;
  }

  // Initialize recognition for other participants
  initializeAllParticipantsRecognition();
  setupParticipantObserver();

  // Check if microphone is muted
  if (isMicrophoneMuted()) {
    showMessage('Microphone is muted. Cannot start recognition.');
    return;
  }

  if (!isRecognitionActive) {
    isRecognitionActive = true;
    showMessage('Starting speech recognition...');
    try {
      recognition.start();
      setupMuteObserver(); // Setup observer when recognition starts
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
  if (isRecognitionActive && recognition) {
    recognition.stop();
    isRecognitionActive = false;
    showMessage('Recognition stopped.');
  }
}

// Clean up observer when extension is deactivated
function cleanup() {
  // Clean up self recognition
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
  stopSpeechRecognition();

  // Clean up participant recognitions
  participantRecognitions.forEach((data, participantId) => {
    data.recognition.stop();
    data.context.close();
    data.source.disconnect();
    data.processor.disconnect();
  });
  participantRecognitions.clear();
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

function initializeAllParticipantsRecognition() {
  // Get all audio elements from other participants
  const participantAudios = document.querySelectorAll('audio[data-participant-id]');
  
  participantAudios.forEach(audio => {
    const participantId = audio.getAttribute('data-participant-id');
    if (!participantRecognitions.has(participantId)) {
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const processor = context.createScriptProcessor(1024, 1, 1);
      
      // Create recognition instance for this participant
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        handleParticipantRecognitionResult(event, participantId);
      };
      
      recognition.onerror = (event) => {
        console.error(`Error in participant recognition (${participantId}):`, event.error);
      };
      
      // Store recognition instance
      participantRecognitions.set(participantId, {
        recognition,
        context,
        source,
        processor
      });
      
      // Start recognition
      recognition.start();
    }
  });
}

function handleParticipantRecognitionResult(event, participantId) {
  const results = event.results;
  for (let i = event.resultIndex; i < results.length; i++) {
    const result = results[i];
    const text = result[0].transcript;
    const isFinal = result.isFinal;
    
    // Show message with participant identifier
    showMessage(`[Participant ${participantId}]: ${text}`, isFinal);
    
    // Send final text for moderation
    if (isFinal) {
      moderateTranscript(text, participantId);
    }
  }
}

// Add to the existing code
const participantRecognitions = new Map();

// Add observer for new participants
function setupParticipantObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        initializeAllParticipantsRecognition();
      }
    });
  });

  // Observe the meeting container for new participants
  const meetingContainer = document.querySelector('[data-meeting-container]');
  if (meetingContainer) {
    observer.observe(meetingContainer, {
      childList: true,
      subtree: true
    });
  }
}
