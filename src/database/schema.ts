import Dexie, { Table } from 'dexie';
import { Prompt, Folder, Category } from '../types';

export class PromptVaultDB extends Dexie {
  prompts!: Table<Prompt, string>;
  folders!: Table<Folder, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('PromptVault');

    this.version(1).stores({
      prompts: '&id, title, category, folderId, isFavorite, *tags, createdAt, lastUsed, sourcePlatform',
      folders: '&id, name, parentId, createdAt',
      categories: '&id, name',
    });
  }
}

export const db = new PromptVaultDB();
