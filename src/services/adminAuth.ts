export const adminAuthService = {
  // Hardcoded admin credentials
  ADMIN_CREDENTIALS: {
    email: 'admin@maverick-ai.com',
    password: 'l'
  },

  async login(email: string, password: string): Promise<boolean> {
    // Simple credential check
    return (
      email === this.ADMIN_CREDENTIALS.email && 
      password === this.ADMIN_CREDENTIALS.password
    );
  },

  async logout() {
    return true;
  },

  async isAuthenticated(): Promise<boolean> {
    // For now, we'll just check if there's a flag in localStorage
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  }
}; 