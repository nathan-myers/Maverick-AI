# Contributing Guidelines  

Great to have you here! Your contributions, whether big or small, make a difference. Here's how you can help make **Maverick AI** better!  

---

## Ways to Contribute  
1. **Code Contributions**: Work on existing bugs, features, or enhancements.  
2. **Issue Triage**: Help by categorizing or tagging issues or suggesting solutions.  
3. **Documentation**: Improve or extend the project's documentation.  
4. **Feature Suggestions**: Share your ideas for new features or improvements.  
5. **Testing**: Test the app and provide feedback on usability and bugs.  

---

## Issues Needing Help  

1. Check out issues labeled **`help wanted`** or **`good first issue`**. These are great starting points for newcomers.  
2. If you didn’t find a bug or feature you'd like to work on, feel free to open a new issue and describe it clearly.  

---

## Getting Started  

### 1. Pick an Issue  
- Browse the [issue tracker](https://github.com/<your-repo>/Maverick-AI/issues).  
- Comment on the issue to get it assigned to you. Ensure the issue isn’t already being worked on by someone else.  

### 2. Fork and Clone the Repository  
- Fork this repository into your GitHub account.  
- Clone it locally:  
  ```bash  
  git clone https://github.com/<your-username>/Maverick-AI.git  
  cd Maverick-AI  
  ```  

### 3. Set Up the Project  
- Refer to the [README](README.md) for setup instructions. Ensure the app runs smoothly on your local environment before starting.  

### 4. Create a New Branch  
- Always create a separate branch for your changes. Use descriptive names like:  
  ```  
  feature/add-new-feature  
  fix/issue-123  
  ```  
  ```bash  
  git checkout -b feature/<your-branch-name>  
  ```  

### 5. Commit Changes  
- Write meaningful commit messages that explain what you’ve done:  
  ```  
  git commit -m "Fix: Resolved issue with incorrect theka display"  
  ```  
- Commit frequently to keep track of progress.  

### 6. Push Your Branch  
- Push your branch to your forked repository:  
  ```bash  
  git push origin feature/<your-branch-name>  
  ```  

---

## Submitting a Pull Request (PR)  

1. Go to the original repository on GitHub and open a **Pull Request** from your branch.  
2. Ensure your PR includes:  
   - A clear and concise title (e.g., "Fix: Issue with Focus Mode Responsiveness").  
   - A detailed description of the changes made, including issue references (e.g., "Fixes #123").  
   - Relevant screenshots, if applicable.  
3. Follow the PR template (if available).  

### PR Guidelines  
- Link the issue your PR addresses.  
- Ensure your changes are tested and do not break existing functionality.  
- Reviewers might request changes; please respond promptly and respectfully.  

---

## Code Guidelines  

- **Formatting**: Use the provided Prettier and ESLint configurations. Run:  
  ```bash  
  npm run lint  
  npm run format  
  ```  

- **Testing**: Write tests for your code and ensure all tests pass before submission:  
  ```bash  
  npm test  
  ```  

- **Documentation**: Add/update documentation for new features in the appropriate markdown files or comments.  

---

## General Etiquette  

1. Follow the [Code of Conduct](CODE_OF_CONDUCT.md).  
2. Be respectful and inclusive in all discussions.  
3. Focus on collaboration, not competition—this is a community effort.  