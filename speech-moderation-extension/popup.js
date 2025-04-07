document.getElementById('startBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => { window.startSpeechRecognition && window.startSpeechRecognition(); }
      });
    });
  });
  
  document.getElementById('stopBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => { window.stopSpeechRecognition && window.stopSpeechRecognition(); }
      });
    });
  });
  