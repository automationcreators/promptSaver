import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Save, Search, Folder, Star, Settings as SettingsIcon, Plus, X } from 'lucide-react';
import {  getAllPrompts, getFavoritePrompts, searchPrompts, createPrompt, updatePrompt, deletePrompt, toggleFavorite, getAllFolders, getAllCategories } from '../database/operations';
import { Prompt } from '../types';
import { PromptList } from '../components/PromptList';
import { PromptEditor } from '../components/PromptEditor';
import { PromptStats } from '../components/PromptStats';
import { Settings } from '../components/Settings';

type View = 'list' | 'editor' | 'stats' | 'settings';

export function App() {
  const [view, setView] = useState<View>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [capturedPrompt, setCapturedPrompt] = useState<any>(null);

  // Load prompts using Dexie hooks
  const allPrompts = useLiveQuery(() => getAllPrompts(), []);
  const favoritePrompts = useLiveQuery(() => getFavoritePrompts(), []);
  const folders = useLiveQuery(() => getAllFolders(), []);
  const categories = useLiveQuery(() => getAllCategories(), []);

  // Filter prompts based on search, favorites, and folder
  const filteredPrompts = React.useMemo(() => {
    let prompts = filterFavorites ? favoritePrompts : allPrompts;

    if (!prompts) return [];

    // Filter by selected folder
    if (selectedFolderId) {
      prompts = prompts.filter((p) => p.folderId === selectedFolderId);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      prompts = prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return prompts;
  }, [allPrompts, favoritePrompts, searchQuery, filterFavorites, selectedFolderId]);

  // Check for captured prompt on mount
  useEffect(() => {
    chrome.storage.local.get(['capturedPrompt'], (result) => {
      if (result.capturedPrompt) {
        setCapturedPrompt(result.capturedPrompt);
        setView('editor');
        // Clear captured prompt
        chrome.storage.local.remove(['capturedPrompt']);
      }
    });
  }, []);

  const handleCreateNew = () => {
    setSelectedPrompt(null);
    setCapturedPrompt(null);
    setView('editor');
  };

  const handleEdit = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setCapturedPrompt(null);
    setView('editor');
  };

  const handleSave = async (data: Partial<Prompt>) => {
    if (selectedPrompt) {
      await updatePrompt(selectedPrompt.id, data);
    } else {
      await createPrompt(data as any);
    }
    setView('list');
    setSelectedPrompt(null);
    setCapturedPrompt(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      await deletePrompt(id);
      if (selectedPrompt?.id === id) {
        setView('list');
        setSelectedPrompt(null);
      }
    }
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5 text-primary-500" />
            <h1 className="text-lg font-semibold text-gray-900">Prompt Vault</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('settings')}
              className={`p-2 rounded-lg transition ${
                view === 'settings'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        {view === 'list' && (
          <div className="mt-3 flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setFilterFavorites(!filterFavorites)}
              className={`p-2 rounded-lg transition ${
                filterFavorites
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
              title="Filter favorites"
            >
              <Star className={`w-4 h-4 ${filterFavorites ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {view === 'list' && (
          <>
            {/* Folder Sidebar */}
            {folders && folders.length > 0 && (
              <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-3">
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedFolderId === null
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Prompts</span>
                      <span className="text-xs text-gray-500">
                        {allPrompts?.length || 0}
                      </span>
                    </div>
                  </button>

                  <div className="mt-2 space-y-1">
                    {folders.map((folder) => {
                      const promptCount = allPrompts?.filter((p) => p.folderId === folder.id).length || 0;
                      return (
                        <button
                          key={folder.id}
                          onClick={() => setSelectedFolderId(folder.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition group ${
                            selectedFolderId === folder.id
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: folder.color || '#3B82F6' }}
                            />
                            <span className="flex-1 truncate font-medium">{folder.name}</span>
                            <span className="text-xs text-gray-500">{promptCount}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Prompt List */}
            <div className="flex-1 overflow-hidden">
              <PromptList
                prompts={filteredPrompts || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </>
        )}

        {view === 'editor' && (
          <PromptEditor
            prompt={selectedPrompt}
            capturedData={capturedPrompt}
            folders={folders || []}
            categories={categories || []}
            onSave={handleSave}
            onCancel={() => {
              setView('list');
              setSelectedPrompt(null);
              setCapturedPrompt(null);
            }}
            onCategoryCreated={() => {
              // useLiveQuery will automatically refresh, but we can add notifications here later
            }}
            onFolderCreated={() => {
              // useLiveQuery will automatically refresh, but we can add notifications here later
            }}
          />
        )}

        {view === 'stats' && (
          <PromptStats
            prompts={allPrompts || []}
            onClose={() => setView('list')}
          />
        )}

        {view === 'settings' && (
          <Settings
            categories={categories || []}
            folders={folders || []}
            prompts={allPrompts || []}
            onClose={() => setView('list')}
            onRefresh={() => {
              // useLiveQuery will auto-refresh, but this can be used for notifications
            }}
          />
        )}
      </main>
    </div>
  );
}
