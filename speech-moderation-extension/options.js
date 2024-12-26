document.addEventListener('DOMContentLoaded', () => {
  // Load saved API key
  chrome.storage.local.get(['huggingface_api_key'], (result) => {
    if (result.huggingface_api_key) {
      document.getElementById('apiKey').value = result.huggingface_api_key;
    }
  });

  // Save API key
  document.getElementById('save').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (apiKey) {
      chrome.storage.local.set({ 
        huggingface_api_key: apiKey 
      }, () => {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 3000);

        // Update background script
        chrome.runtime.sendMessage({ 
          action: 'updateApiKey', 
          apiKey: apiKey 
        });
      });
    }
  });
}); 