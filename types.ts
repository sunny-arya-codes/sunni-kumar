
export interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}
