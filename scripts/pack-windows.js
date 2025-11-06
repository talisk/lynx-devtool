#!/usr/bin/env node

/**
 * Package Windows unpacked build into a ZIP file
 * This is a workaround for electron-builder signing issues on Windows
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJson = require('../package.json');
const version = packageJson.version;

const distDir = path.join(__dirname, '..', 'dist');
const unpackedDir = path.join(distDir, 'win-unpacked');
const zipName = `Lynx-DevTool-${version}-x64.zip`;
const zipPath = path.join(distDir, zipName);

console.log('\n========================================');
console.log('Packaging Windows build to ZIP...');
console.log('========================================');
console.log(`Version: ${version}`);
console.log(`Source: ${unpackedDir}`);
console.log(`Target: ${zipPath}`);

if (!fs.existsSync(unpackedDir)) {
  console.error('\nError: win-unpacked directory not found');
  console.error('   The electron-builder --dir step may have failed.');
  console.error('   Please check the build logs above.');
  process.exit(1);
}

try {
  // Remove existing ZIP if present
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log('Removed existing ZIP file');
  }
  
  console.log('\nCreating ZIP archive...');
  
  // Use PowerShell on Windows to create ZIP
  if (process.platform === 'win32') {
    const command = `powershell -Command "Compress-Archive -Path '${unpackedDir}\\*' -DestinationPath '${zipPath}' -Force -CompressionLevel Optimal"`;
    execSync(command, { stdio: 'pipe' }); // Use pipe to suppress output
  } else {
    // Use zip command on Unix
    const command = `cd "${unpackedDir}" && zip -r -9 "${zipPath}" .`;
    execSync(command, { stdio: 'pipe' });
  }
  
  if (fs.existsSync(zipPath)) {
    const stats = fs.statSync(zipPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`\nSUCCESS! Created ${zipName}`);
    console.log(`   Size: ${sizeMB} MB`);
    console.log(`   Location: ${zipPath}`);
    console.log('\n========================================');
    console.log('Windows green package ready!');
    console.log('Extract and run LynxDevTool.exe');
    console.log('========================================\n');
  } else {
    throw new Error('ZIP file was not created');
  }
} catch (error) {
  console.error('\nFailed to create ZIP:', error.message);
  process.exit(1);
}

