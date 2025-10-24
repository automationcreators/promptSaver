import { nanoid } from 'nanoid';
import { db } from './schema';
import { Prompt, Folder, Category, LLMPlatform } from '../types';

// ============ Prompt Operations ============

export async function createPrompt(data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prompt> {
  const prompt: Prompt = {
    ...data,
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    usageCount: data.usageCount || 0,
    isFavorite: data.isFavorite || false,
    tags: data.tags || [],
    platformUsage: data.platformUsage || {},
    hasVariables: data.hasVariables || false,
  };

  await db.prompts.add(prompt);
  return prompt;
}

export async function updatePrompt(id: string, updates: Partial<Prompt>): Promise<void> {
  await db.prompts.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

export async function deletePrompt(id: string): Promise<void> {
  await db.prompts.delete(id);
}

export async function getPrompt(id: string): Promise<Prompt | undefined> {
  return await db.prompts.get(id);
}

export async function getAllPrompts(): Promise<Prompt[]> {
  return await db.prompts.toArray();
}

export async function getPromptsByFolder(folderId: string): Promise<Prompt[]> {
  return await db.prompts.where('folderId').equals(folderId).toArray();
}

export async function getPromptsByCategory(category: string): Promise<Prompt[]> {
  return await db.prompts.where('category').equals(category).toArray();
}

export async function getFavoritePrompts(): Promise<Prompt[]> {
  return await db.prompts.where('isFavorite').equals(1).toArray();
}

export async function searchPrompts(query: string): Promise<Prompt[]> {
  const lowerQuery = query.toLowerCase();
  return await db.prompts
    .filter(prompt =>
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
    .toArray();
}

// Track usage (#23)
export async function trackPromptUsage(id: string, platform: LLMPlatform): Promise<void> {
  const prompt = await getPrompt(id);
  if (!prompt) return;

  await db.prompts.update(id, {
    usageCount: (prompt.usageCount || 0) + 1,
    lastUsed: new Date(),
    platformUsage: {
      ...prompt.platformUsage,
      [platform]: (prompt.platformUsage[platform] || 0) + 1,
    },
  });
}

// Toggle favorite (#20)
export async function toggleFavorite(id: string): Promise<boolean> {
  const prompt = await getPrompt(id);
  if (!prompt) return false;

  const newState = !prompt.isFavorite;
  await db.prompts.update(id, { isFavorite: newState });
  return newState;
}

// Bulk operations (#25)
export async function bulkDeletePrompts(ids: string[]): Promise<void> {
  await db.prompts.bulkDelete(ids);
}

export async function bulkUpdatePrompts(updates: Array<{ id: string; changes: Partial<Prompt> }>): Promise<void> {
  await Promise.all(
    updates.map(({ id, changes }) => updatePrompt(id, changes))
  );
}

export async function bulkMoveToFolder(promptIds: string[], folderId: string): Promise<void> {
  await db.prompts.bulkUpdate(
    promptIds.map(id => ({ key: id, changes: { folderId, updatedAt: new Date() } }))
  );
}

// ============ Folder Operations (#19) ============

export async function createFolder(data: { name: string; parentId?: string; color?: string }): Promise<string> {
  const folder: Folder = {
    id: nanoid(),
    name: data.name,
    parentId: data.parentId,
    color: data.color,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.folders.add(folder);
  return folder.id;
}

export async function updateFolder(id: string, updates: Partial<Folder>): Promise<void> {
  await db.folders.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

export async function deleteFolder(id: string, deleteContents: boolean = false): Promise<void> {
  if (deleteContents) {
    // Delete all prompts in this folder
    const prompts = await getPromptsByFolder(id);
    await bulkDeletePrompts(prompts.map(p => p.id));

    // Delete all subfolders recursively
    const subfolders = await db.folders.where('parentId').equals(id).toArray();
    for (const subfolder of subfolders) {
      await deleteFolder(subfolder.id, true);
    }
  } else {
    // Move prompts to root (no folder)
    const prompts = await getPromptsByFolder(id);
    await bulkUpdatePrompts(prompts.map(p => ({ id: p.id, changes: { folderId: undefined } })));
  }

  await db.folders.delete(id);
}

export async function getAllFolders(): Promise<Folder[]> {
  return await db.folders.toArray();
}

export async function getRootFolders(): Promise<Folder[]> {
  return await db.folders.where('parentId').equals(undefined as any).toArray();
}

export async function getSubfolders(parentId: string): Promise<Folder[]> {
  return await db.folders.where('parentId').equals(parentId).toArray();
}

// ============ Category Operations ============

export async function createCategory(data: { name: string; description?: string; color?: string }): Promise<string> {
  const category: Category = {
    id: nanoid(),
    name: data.name,
    description: data.description,
    color: data.color,
  };

  await db.categories.add(category);
  return category.id;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  await db.categories.update(id, updates);
}

export async function getAllCategories(): Promise<Category[]> {
  return await db.categories.toArray();
}

export async function deleteCategory(id: string): Promise<void> {
  await db.categories.delete(id);
}

// ============ Export/Import (#16, #33) ============

export async function exportAllData(): Promise<string> {
  const prompts = await getAllPrompts();
  const folders = await getAllFolders();
  const categories = await getAllCategories();

  return JSON.stringify({
    version: '1.0.0',
    exportDate: new Date(),
    prompts,
    folders,
    categories,
  }, null, 2);
}

export async function importData(jsonData: string): Promise<{ success: boolean; error?: string }> {
  try {
    const data = JSON.parse(jsonData);

    // Import categories first
    if (data.categories) {
      await db.categories.bulkPut(data.categories);
    }

    // Import folders
    if (data.folders) {
      await db.folders.bulkPut(data.folders);
    }

    // Import prompts
    if (data.prompts) {
      await db.prompts.bulkPut(data.prompts);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
