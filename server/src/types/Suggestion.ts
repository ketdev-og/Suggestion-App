export interface Suggestion {
  name: string;
  description: string;
}

export interface SuggestionsData {
  [key: string]: Suggestion[];
}

export interface SuggestionRequest {
  age: number;
  goal: string;
}
export interface SuggestionResponse {
  suggestions: Suggestion[];
}
