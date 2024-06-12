
export function detectLanguage(code: string): string {
    // Implement a basic language detection logic
    if (/^\s*<\?php/.test(code)) {
      return 'php';
    } else if (/^\s*import /m.test(code) || /from 'react'/m.test(code)) {
      return 'typescript';
    } else if (/^\s*function /m.test(code) || /console\.log/.test(code)) {
      return 'javascript';
    } else if (/^\s*def /m.test(code) || /print\(/.test(code)) {
      return 'python';
    }
    // Add more rules as needed
    return 'plaintext';
  }
  