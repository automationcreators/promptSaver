// Core prompt type with all features
export interface Prompt {
  id: string;
  title: string;
  content: string;
  notes?: string;

  // Organization
  folderId?: string;
  category: string;
  tags: string[];

  // Favorites & Metrics (#20, #23)
  isFavorite: boolean;
  usageCount: number;
  lastUsed?: Date;
  platformUsage: Record<LLMPlatform, number>;

  // Template variables (#2)
  hasVariables: boolean;
  variables?: TemplateVariable[];

  // Model-specific (#27)
  optimizedFor?: LLMPlatform[];
  modelSpecificNotes?: Record<LLMPlatform, string>;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  sourcePlatform?: LLMPlatform;
  sourceUrl?: string;
}

export type LLMPlatform =
  | 'claude'
  | 'chatgpt'
  | 'grok'
  | 'perplexity'
  | 'gemini'
  | 'meta';

export interface TemplateVariable {
  type: 'text' | 'menu' | 'date' | 'number';
  name: string;
  label?: string;
  default?: string;
  options?: string[]; // For menu type
  placeholder?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string; // For nested folders (#19)
  color?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// For prompt classification (#6)
export interface ClassificationResult {
  category: string;
  confidence: number;
  suggestedTags: string[];
  suggestedFolder?: string;
}

// For duplicate detection (#22)
export interface DuplicateMatch {
  promptId: string;
  similarity: number;
  matchedContent: string;
}

// For prompt improvement (#27)
export interface ImprovementSuggestion {
  platform: LLMPlatform;
  suggestions: string[];
  score: number;
  improvedVersion?: string;
}

// Export/Import types (#33)
export interface ExportFormat {
  version: string;
  exportDate: Date;
  prompts: Prompt[];
  folders: Folder[];
  categories: Category[];
}

export interface NotionExport {
  databaseId?: string;
  pages: Array<{
    title: string;
    content: string;
    properties: Record<string, any>;
  }>;
}

export interface ObsidianExport {
  vaultPath: string;
  files: Array<{
    path: string;
    content: string;
    frontmatter: Record<string, any>;
  }>;
}
