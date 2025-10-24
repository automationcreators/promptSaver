import React from 'react';
import { Star, Edit2, Trash2, Clock, Folder, Save } from 'lucide-react';
import { Prompt } from '../types';

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function PromptList({ prompts, onEdit, onDelete, onToggleFavorite }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
        <Save className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">No prompts yet</p>
        <p className="text-sm text-center mt-2">
          Create your first prompt or capture one from an LLM platform
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-2">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onEdit={() => onEdit(prompt)}
            onDelete={() => onDelete(prompt.id)}
            onToggleFavorite={() => onToggleFavorite(prompt.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface PromptCardProps {
  prompt: Prompt;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

function PromptCard({ prompt, onEdit, onDelete, onToggleFavorite }: PromptCardProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-primary-300 hover:shadow-sm transition group">
      <div className="flex items-start gap-3">
        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          className="flex-shrink-0 mt-1 text-gray-400 hover:text-yellow-500 transition"
        >
          <Star
            className={`w-4 h-4 ${prompt.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
          />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{prompt.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{prompt.content}</p>

          {/* Metadata */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {prompt.category && (
              <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded font-medium">
                {prompt.category}
              </span>
            )}
            {prompt.usageCount > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Used {prompt.usageCount}x
              </span>
            )}
            {prompt.lastUsed && (
              <span className="flex items-center gap-1">
                Last: {formatDate(prompt.lastUsed)}
              </span>
            )}
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {prompt.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
