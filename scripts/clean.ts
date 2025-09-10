#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Clean Script
 *
 * This script cleans build artifacts and temporary files
 * Run with: node scripts/clean.js
 */

const fs = require('fs');
const path = require('path');

const foldersToClean = ['.next', 'dist', 'build'];

const filesToClean = ['tsconfig.tsbuildinfo'];

console.log('🧹 Cleaning build artifacts...\n');

// Clean folders
foldersToClean.forEach((folder) => {
  if (fs.existsSync(folder)) {
    console.log(`🗑️  Removing ${folder}/`);
    try {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`✅ Removed ${folder}/`);
    } catch (error) {
      console.log(
        `❌ Failed to remove ${folder}/: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
});

// Clean files
filesToClean.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`🗑️  Removing ${file}`);
    try {
      fs.unlinkSync(file);
      console.log(`✅ Removed ${file}`);
    } catch (error) {
      console.log(
        `❌ Failed to remove ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
});

console.log('\n✨ Cleanup complete!');
console.log('You can now run a fresh build with: npm run build');
