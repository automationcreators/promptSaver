import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Save, Search, Folder, Star, Settings as SettingsIcon, Plus, X, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [capturedPrompt, setCapturedPrompt] = useState<any>(null);

  // Collapsible filter states
  const [foldersExpanded, setFoldersExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  // Load prompts using Dexie hooks
  const allPrompts = useLiveQuery(() => getAllPrompts(), []);
  const favoritePrompts = useLiveQuery(() => getFavoritePrompts(), []);
  const folders = useLiveQuery(() => getAllFolders(), []);
  const categories = useLiveQuery(() => getAllCategories(), []);

  // Get all unique tags from all prompts
  const allTags = React.useMemo(() => {
    if (!allPrompts) return [];
    const tagSet = new Set<string>();
    allPrompts.forEach(prompt => {
      prompt.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allPrompts]);

  // Filter prompts based on search, favorites, folder, category, and tags
  const filteredPrompts = React.useMemo(() => {
    let prompts = allPrompts || [];

    if (!prompts.length) return [];

    // Filter by favorites first
    if (filterFavorites) {
      prompts = prompts.filter((p) => p.isFavorite);
    }

    // Filter by selected folder
    if (selectedFolderId) {
      prompts = prompts.filter((p) => p.folderId === selectedFolderId);
    }

    // Filter by selected category
    if (selectedCategoryId) {
      prompts = prompts.filter((p) => p.categoryId === selectedCategoryId);
    }

    // Filter by selected tags (AND logic - prompt must have all selected tags)
    if (selectedTags.length > 0) {
      prompts = prompts.filter((p) =>
        selectedTags.every(tag => p.tags.includes(tag))
      );
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
  }, [allPrompts, searchQuery, filterFavorites, selectedFolderId, selectedCategoryId, selectedTags]);

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
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
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

            {/* Collapsible Filters */}
            <div className="space-y-1">
              {/* Folders Filter */}
              {folders && folders.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white">
                  <button
                    onClick={() => setFoldersExpanded(!foldersExpanded)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {foldersExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <Folder className="w-4 h-4" />
                      <span>Folders</span>
                      {selectedFolderId && <span className="text-xs text-primary-600">(1 selected)</span>}
                    </div>
                  </button>
                  {foldersExpanded && (
                    <div className="px-3 pb-2 space-y-1">
                      <button
                        onClick={() => setSelectedFolderId(null)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                          selectedFolderId === null
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        All Folders
                      </button>
                      {folders.map((folder) => (
                        <button
                          key={folder.id}
                          onClick={() => setSelectedFolderId(folder.id)}
                          className={`w-full text-left px-2 py-1.5 rounded text-xs transition flex items-center gap-2 ${
                            selectedFolderId === folder.id
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: folder.color || '#3B82F6' }}
                          />
                          {folder.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Categories Filter */}
              {categories && categories.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white">
                  <button
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {categoriesExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                        <div className="bg-primary-400 rounded-sm"></div>
                        <div className="bg-primary-500 rounded-sm"></div>
                        <div className="bg-primary-600 rounded-sm"></div>
                        <div className="bg-primary-700 rounded-sm"></div>
                      </div>
                      <span>Categories</span>
                      {selectedCategoryId && <span className="text-xs text-primary-600">(1 selected)</span>}
                    </div>
                  </button>
                  {categoriesExpanded && (
                    <div className="px-3 pb-2 space-y-1">
                      <button
                        onClick={() => setSelectedCategoryId(null)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                          selectedCategoryId === null
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategoryId(category.id)}
                          className={`w-full text-left px-2 py-1.5 rounded text-xs transition flex items-center gap-2 ${
                            selectedCategoryId === category.id
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className="w-2 h-2 rounded"
                            style={{ backgroundColor: category.color || '#3B82F6' }}
                          />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white">
                  <button
                    onClick={() => setTagsExpanded(!tagsExpanded)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {tagsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <span className="text-lg">#</span>
                      <span>Tags</span>
                      {selectedTags.length > 0 && <span className="text-xs text-primary-600">({selectedTags.length} selected)</span>}
                    </div>
                  </button>
                  {tagsExpanded && (
                    <div className="px-3 pb-2 space-y-1 max-h-48 overflow-y-auto">
                      {selectedTags.length > 0 && (
                        <button
                          onClick={() => setSelectedTags([])}
                          className="w-full text-left px-2 py-1.5 rounded text-xs text-red-600 hover:bg-red-50 transition font-medium"
                        >
                          Clear all tags
                        </button>
                      )}
                      {allTags.map((tag) => (
                        <label
                          key={tag}
                          className="flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-gray-50 cursor-pointer transition"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTags([...selectedTags, tag]);
                              } else {
                                setSelectedTags(selectedTags.filter(t => t !== tag));
                              }
                            }}
                            className="w-3 h-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {view === 'list' && (
          <div className="flex-1 overflow-hidden">
            <PromptList
              prompts={filteredPrompts || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
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
