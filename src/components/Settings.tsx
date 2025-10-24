import React, { useState, useEffect } from 'react';
import { X, Edit2, Trash2, Plus, FolderOpen, Tag as TagIcon, Grid, Save, Cloud, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Category, Folder, Prompt } from '../types';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createFolder,
  updateFolder,
  deleteFolder,
  getAllPrompts,
} from '../database/operations';
import {
  syncToGoogleSheets,
  testConnection,
  getSyncConfig,
  saveSyncConfig,
  updateLastSync,
  formatLastSync,
  SyncConfig,
} from '../utils/googleSheetsSync';

interface SettingsProps {
  categories: Category[];
  folders: Folder[];
  prompts: Prompt[];
  onClose: () => void;
  onRefresh?: () => void;
}

type Tab = 'categories' | 'folders' | 'tags' | 'backup';

export function Settings({ categories, folders, prompts, onClose, onRefresh }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('categories');

  // Category management state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#3B82F6' });
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Folder management state
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [newFolder, setNewFolder] = useState({ name: '', color: '#3B82F6' });
  const [showFolderForm, setShowFolderForm] = useState(false);

  // Get all unique tags from prompts
  const allTags = React.useMemo(() => {
    const tagMap = new Map<string, number>();
    prompts.forEach(prompt => {
      prompt.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries()).map(([tag, count]) => ({ tag, count }));
  }, [prompts]);

  // Google Sheets backup state
  const [webAppUrl, setWebAppUrl] = useState('');
  const [syncConfig, setSyncConfig] = useState<SyncConfig | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load sync config on mount
  useEffect(() => {
    loadSyncConfig();
  }, []);

  const loadSyncConfig = async () => {
    const config = await getSyncConfig();
    if (config) {
      setSyncConfig(config);
      setWebAppUrl(config.webAppUrl);
    }
  };

  // Category handlers
  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      await createCategory(newCategory);
      setNewCategory({ name: '', description: '', color: '#3B82F6' });
      setShowCategoryForm(false);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('Failed to create category');
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    if (!category.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      await updateCategory(category.id, {
        name: category.name,
        description: category.description,
        color: category.color,
      });
      setEditingCategory(null);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('Failed to update category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Prompts will not be deleted.')) {
      return;
    }

    try {
      await deleteCategory(id);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
    }
  };

  // Folder handlers
  const handleCreateFolder = async () => {
    if (!newFolder.name.trim()) {
      alert('Folder name is required');
      return;
    }

    try {
      await createFolder(newFolder);
      setNewFolder({ name: '', color: '#3B82F6' });
      setShowFolderForm(false);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to create folder:', error);
      alert('Failed to create folder');
    }
  };

  const handleUpdateFolder = async (folder: Folder) => {
    if (!folder.name.trim()) {
      alert('Folder name is required');
      return;
    }

    try {
      await updateFolder(folder.id, {
        name: folder.name,
        color: folder.color,
      });
      setEditingFolder(null);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to update folder:', error);
      alert('Failed to update folder');
    }
  };

  const handleDeleteFolder = async (id: string) => {
    const promptsInFolder = prompts.filter(p => p.folderId === id).length;

    if (promptsInFolder > 0) {
      if (!confirm(`This folder contains ${promptsInFolder} prompt(s). Are you sure you want to delete it? Prompts will not be deleted.`)) {
        return;
      }
    } else {
      if (!confirm('Are you sure you want to delete this folder?')) {
        return;
      }
    }

    try {
      await deleteFolder(id);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to delete folder:', error);
      alert('Failed to delete folder');
    }
  };

  // Google Sheets handlers
  const handleTestConnection = async () => {
    if (!webAppUrl.trim()) {
      setSyncMessage({ type: 'error', text: 'Please enter a Google Apps Script URL' });
      return;
    }

    setIsTesting(true);
    setSyncMessage(null);

    const result = await testConnection(webAppUrl);

    setIsTesting(false);
    setSyncMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      // Save the URL if connection successful
      const config: SyncConfig = {
        webAppUrl: webAppUrl.trim(),
        enabled: true,
        lastSync: syncConfig?.lastSync,
      };
      await saveSyncConfig(config);
      setSyncConfig(config);
    }
  };

  const handleSyncNow = async () => {
    if (!webAppUrl.trim()) {
      setSyncMessage({ type: 'error', text: 'Please enter and test your URL first' });
      return;
    }

    if (prompts.length === 0) {
      setSyncMessage({ type: 'error', text: 'No prompts to sync' });
      return;
    }

    setIsSyncing(true);
    setSyncMessage(null);

    const result = await syncToGoogleSheets(webAppUrl, prompts);

    setIsSyncing(false);
    setSyncMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      await updateLastSync();
      await loadSyncConfig(); // Reload to update last sync time
    }
  };

  const handleUrlChange = (value: string) => {
    setWebAppUrl(value);
    setSyncMessage(null);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'categories'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid className="w-4 h-4" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab('folders')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'folders'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Folders
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'tags'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TagIcon className="w-4 h-4" />
            Tags
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'backup'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Cloud className="w-4 h-4" />
            Backup
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{categories.length} categories</p>
              <button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>

            {/* New Category Form */}
            {showCategoryForm && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-3">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1 flex gap-2">
                    <button
                      onClick={() => {
                        setShowCategoryForm(false);
                        setNewCategory({ name: '', description: '', color: '#3B82F6' });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateCategory}
                      className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-sm font-medium"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Category List */}
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white border border-gray-200 rounded-lg p-3"
                >
                  {editingCategory?.id === category.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="text"
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        placeholder="Description"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editingCategory.color || '#3B82F6'}
                          onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                          className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="px-2 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateCategory(editingCategory)}
                          className="px-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 text-xs flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: category.color || '#3B82F6' }}
                        />
                        <div>
                          <div className="font-medium text-sm text-gray-900">{category.name}</div>
                          {category.description && (
                            <div className="text-xs text-gray-500">{category.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Folders Tab */}
        {activeTab === 'folders' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{folders.length} folders</p>
              <button
                onClick={() => setShowFolderForm(!showFolderForm)}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Folder
              </button>
            </div>

            {/* New Folder Form */}
            {showFolderForm && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-3">
                <input
                  type="text"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                  placeholder="Folder name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newFolder.color}
                    onChange={(e) => setNewFolder({ ...newFolder, color: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1 flex gap-2">
                    <button
                      onClick={() => {
                        setShowFolderForm(false);
                        setNewFolder({ name: '', color: '#3B82F6' });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateFolder}
                      className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-sm font-medium"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Folder List */}
            <div className="space-y-2">
              {folders.map((folder) => {
                const promptCount = prompts.filter(p => p.folderId === folder.id).length;

                return (
                  <div
                    key={folder.id}
                    className="bg-white border border-gray-200 rounded-lg p-3"
                  >
                    {editingFolder?.id === folder.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingFolder.name}
                          onChange={(e) => setEditingFolder({ ...editingFolder, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={editingFolder.color || '#3B82F6'}
                            onChange={(e) => setEditingFolder({ ...editingFolder, color: e.target.value })}
                            className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                          />
                          <button
                            onClick={() => setEditingFolder(null)}
                            className="px-2 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateFolder(editingFolder)}
                            className="px-2 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 text-xs flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: folder.color || '#3B82F6' }}
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">{folder.name}</div>
                            <div className="text-xs text-gray-500">{promptCount} prompt(s)</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingFolder(folder)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFolder(folder.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags Tab */}
        {activeTab === 'tags' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{allTags.length} unique tags</p>
            </div>

            {allTags.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <TagIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tags found</p>
                <p className="text-xs mt-1">Tags are created when you add them to prompts</p>
              </div>
            ) : (
              <div className="space-y-2">
                {allTags.map(({ tag, count }) => (
                  <div
                    key={tag}
                    className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <TagIcon className="w-4 h-4 text-primary-500" />
                      <div>
                        <div className="font-medium text-sm text-gray-900">{tag}</div>
                        <div className="text-xs text-gray-500">Used in {count} prompt(s)</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Tags are managed through individual prompts.
                To remove a tag completely, remove it from all prompts that use it.
              </p>
            </div>
          </div>
        )}

        {/* Backup Tab */}
        {activeTab === 'backup' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary-500" />
                Google Sheets Backup
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Sync your prompts to a Google Sheet for backup and sharing.
                Your data stays in your control.
              </p>

              {/* Setup Instructions Alert */}
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Setup Required (One-Time)
                    </h4>
                    <p className="text-xs text-blue-800 mb-2">
                      You'll need to create a Google Apps Script to enable syncing. It takes about 5 minutes.
                    </p>
                    <a
                      href="https://github.com/elizabethknopf/prompt-vault/blob/main/GOOGLE_SHEETS_INTEGRATION.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Setup Instructions
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Apps Script Web App URL
                  </label>
                  <input
                    type="url"
                    value={webAppUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-mono"
                    disabled={isTesting || isSyncing}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Paste the Web App URL from your Google Apps Script deployment
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting || isSyncing || !webAppUrl.trim()}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition ${
                      isTesting || isSyncing || !webAppUrl.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isTesting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Test Connection
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSyncNow}
                    disabled={isSyncing || isTesting || !webAppUrl.trim()}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isSyncing || isTesting || !webAppUrl.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {isSyncing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4" />
                        Sync Now
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {syncMessage && (
                  <div
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      syncMessage.type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {syncMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p
                      className={`text-sm ${
                        syncMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {syncMessage.text}
                    </p>
                  </div>
                )}

                {/* Last Sync Info */}
                {syncConfig?.lastSync && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last synced:</span>
                      <span className="font-medium text-gray-900">
                        {formatLastSync(syncConfig.lastSync)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-600">Total prompts:</span>
                      <span className="font-medium text-gray-900">{prompts.length}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">How it works</h4>
              <ol className="text-xs text-gray-600 space-y-2 ml-4 list-decimal">
                <li>Create a Google Sheet for your backups</li>
                <li>Add the provided Apps Script to your sheet</li>
                <li>Deploy the script as a web app</li>
                <li>Copy the deployment URL and paste it above</li>
                <li>Click "Sync Now" to backup your prompts</li>
              </ol>

              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-700">
                  <strong className="text-gray-900">Privacy Note:</strong> Your prompts are sent directly
                  to your own Google Sheet. No third-party servers are involved.
                  You maintain complete control over your data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
