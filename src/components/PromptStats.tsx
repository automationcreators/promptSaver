import React from 'react';
import { X, TrendingUp, Star, Folder, Tag } from 'lucide-react';
import { Prompt } from '../types';

interface PromptStatsProps {
  prompts: Prompt[];
  onClose: () => void;
}

export function PromptStats({ prompts, onClose }: PromptStatsProps) {
  // Calculate stats
  const totalPrompts = prompts.length;
  const favoriteCount = prompts.filter(p => p.isFavorite).length;
  const totalUsage = prompts.reduce((sum, p) => sum + (p.usageCount || 0), 0);

  // Most used prompts
  const mostUsed = [...prompts]
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 5);

  // Category distribution
  const categoryStats = prompts.reduce((acc, p) => {
    const cat = p.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Platform usage
  const platformStats = prompts.reduce((acc, p) => {
    Object.entries(p.platformUsage || {}).forEach(([platform, count]) => {
      acc[platform] = (acc[platform] || 0) + count;
    });
    return acc;
  }, {} as Record<string, number>);

  // Recent activity
  const recentPrompts = [...prompts]
    .filter(p => p.lastUsed)
    .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))
    .slice(0, 5);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Statistics & Insights</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Folder className="w-5 h-5" />}
            label="Total Prompts"
            value={totalPrompts}
            color="blue"
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            label="Favorites"
            value={favoriteCount}
            color="yellow"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Total Uses"
            value={totalUsage}
            color="green"
          />
        </div>

        {/* Most Used */}
        {mostUsed.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Most Used Prompts</h3>
            <div className="space-y-2">
              {mostUsed.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {prompt.title}
                    </p>
                    <p className="text-xs text-gray-500">{prompt.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary-600 ml-2">
                    {prompt.usageCount}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Distribution */}
        {Object.keys(categoryStats).length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">By Category</h3>
            <div className="space-y-2">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{category}</span>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(count / totalPrompts) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Usage */}
        {Object.keys(platformStats).length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Platform Usage</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(platformStats).map(([platform, count]) => (
                <div
                  key={platform}
                  className="p-2 bg-gray-50 rounded-lg"
                >
                  <p className="text-xs text-gray-500 capitalize">{platform}</p>
                  <p className="text-lg font-semibold text-gray-900">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {recentPrompts.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Recently Used</h3>
            <div className="space-y-1">
              {recentPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between p-2 text-sm"
                >
                  <span className="text-gray-700 truncate flex-1">{prompt.title}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {prompt.lastUsed && new Date(prompt.lastUsed).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'yellow' | 'green';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-2`}>
        {icon}
      </div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
