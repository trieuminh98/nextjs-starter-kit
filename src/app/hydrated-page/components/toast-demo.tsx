'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createPokemon, updatePokemon, deletePokemon } from '@/services/pokemon.service';
import { Pokemon } from '@/types/pokemon';

const ToastDemo = () => {
  const [pokemonName, setPokemonName] = useState('Pikachu');

  // Create Pokemon mutation with global toast
  const createMutation = useMutation({
    mutationFn: createPokemon,
    meta: {
      invalidatesQuery: ['pokemon'], // Use the base query key
      successMessage: 'Pokemon created successfully! 🎉',
      successTitle: 'A new Pokemon has been added to your collection',
      errorMessage: 'Failed to create Pokemon 😢',
      errorTitle: 'Please try again later',
    },
  });

  // Update Pokemon mutation with global toast
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Pokemon> }) => updatePokemon(id, data),
    meta: {
      invalidatesQuery: ['pokemon'], // Use the base query key
      successMessage: 'Pokemon updated successfully! ✨',
      successTitle: 'Your Pokemon has been modified',
      errorMessage: 'Failed to update Pokemon 😢',
      errorTitle: 'Please check your data and try again',
    },
  });

  // Delete Pokemon mutation with global toast
  const deleteMutation = useMutation({
    mutationFn: deletePokemon,
    meta: {
      invalidatesQuery: ['pokemon'], // Use the base query key
      successMessage: 'Pokemon deleted successfully! 🗑️',
      successTitle: 'The Pokemon has been removed from your collection',
      errorMessage: 'Failed to delete Pokemon 😢',
      errorTitle: 'Please try again later',
    },
  });

  // Mutation without toast (skipToast: true)
  const silentMutation = useMutation({
    mutationFn: createPokemon,
    meta: {
      skipToast: true,
      invalidatesQuery: ['pokemon'], // Use the base query key
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ name: pokemonName });
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: 25, data: { name: `${pokemonName} Updated` } });
  };

  const handleDelete = () => {
    deleteMutation.mutate(25);
  };

  const handleSilentCreate = () => {
    silentMutation.mutate({ name: `${pokemonName} Silent` });
  };

  return (
    <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4">
      <h3 className="text-lg font-semibold">Global Toast Demo</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Test global toast notifications with TanStack Query mutations
      </p>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="px-3 py-2 border rounded text-sm"
            placeholder="Pokemon name"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCreate}
            disabled={createMutation.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            {createMutation.isPending ? 'Creating...' : 'Create Pokemon'}
          </button>

          <button
            onClick={handleUpdate}
            disabled={updateMutation.isPending}
            className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Pokemon'}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Pokemon'}
          </button>

          <button
            onClick={handleSilentCreate}
            disabled={silentMutation.isPending}
            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
          >
            {silentMutation.isPending ? 'Creating...' : 'Silent Create (No Toast)'}
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>• Success toasts show automatically on successful mutations</p>
        <p>• Error toasts show automatically on failed mutations</p>
        <p>• Cache invalidation happens automatically</p>
        <p>
          • Use <code>skipToast: true</code> to disable toasts for specific mutations
        </p>
      </div>
    </div>
  );
};

export default ToastDemo;
