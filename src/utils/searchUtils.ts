import Task from "@/types/Task";

// Fuzzy search implementation using Levenshtein distance
export function fuzzySearch(text: string, pattern: string): boolean {
  const textLower = text.toLowerCase();
  const patternLower = pattern.toLowerCase();
  
  // If pattern is empty, return true
  if (!patternLower) return true;
  
  // If text is shorter than pattern, it can't match
  if (textLower.length < patternLower.length) return false;
  
  // Check for exact match first
  if (textLower.includes(patternLower)) return true;
  
  // Calculate Levenshtein distance
  const distance = levenshteinDistance(textLower, patternLower);
  
  // Allow for some typos/mismatches based on pattern length
  const maxDistance = Math.max(1, Math.floor(patternLower.length / 3));
  return distance <= maxDistance;
}

// Levenshtein distance calculation
function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

// Highlight text with search term
export function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Escape special characters in search term for regex
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Generate search suggestions based on task content
export function generateSuggestions(tasks: Task[], searchTerm: string): string[] {
  if (!searchTerm) return [];
  
  const suggestions = new Set<string>();
  const searchTermLower = searchTerm.toLowerCase();
  
  tasks.forEach(task => {
    // Add matching text
    if (task.text.toLowerCase().includes(searchTermLower)) {
      suggestions.add(task.text);
    }
    
    // Add matching description
    if (task.description?.toLowerCase().includes(searchTermLower)) {
      suggestions.add(task.description);
    }
    
    // Add matching category
    if (task.category?.toLowerCase().includes(searchTermLower)) {
      suggestions.add(task.category);
    }
  });
  
  return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
}

// Search history management
export class SearchHistory {
  private static readonly HISTORY_KEY = 'searchHistory';
  private static readonly MAX_HISTORY = 10;
  
  static getHistory(): string[] {
    try {
      const history = localStorage.getItem(this.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }
  
  static addToHistory(term: string): void {
    if (!term.trim()) return;
    
    try {
      const history = this.getHistory();
      const newHistory = [term, ...history.filter(item => item !== term)]
        .slice(0, this.MAX_HISTORY);
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }
  
  static clearHistory(): void {
    try {
      localStorage.removeItem(this.HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }
} 