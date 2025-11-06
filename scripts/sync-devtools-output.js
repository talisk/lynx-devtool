#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Change to project root directory
const projectRoot = path.join(__dirname, '..');
process.chdir(projectRoot);

const aPath = 'packages/devtools-frontend-lynx/output';
const bPath = 'packages/lynx-devtool-cli/resources';

// Function to run command with proper error handling
function runCommand(command, options = {}) {
    try {
        console.log(`Running: ${command}`);
        const result = execSync(command, {
            stdio: 'inherit',
            encoding: 'utf8',
            ...options
        });
        return result;
    } catch (error) {
        console.error(`Command failed: ${command}`);
        console.error(error.message);
        throw error;
    }
}

// Function to find files matching pattern
function findFiles(dir, pattern) {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const files = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && item.match(pattern)) {
            files.push(fullPath);
        } else if (stat.isDirectory()) {
            files.push(...findFiles(fullPath, pattern));
        }
    });

    return files;
}

// Function to sort files by version (natural sort)
function sortByVersion(files) {
    return files.sort((a, b) => {
        // Extract version numbers from filename
        const extractVersion = (filename) => {
            const match = filename.match(/devtool\.frontend\.lynx_1\.0\.(\d+)\.tar\.gz/);
            return match ? parseInt(match[1]) : 0;
        };

        const versionA = extractVersion(path.basename(a));
        const versionB = extractVersion(path.basename(b));

        return versionA - versionB;
    });
}

// Main function
function main() {
    try {
        console.log('Syncing devtools output...');

        // Find the latest devtool.frontend.lynx file
        const pattern = /^devtool\.frontend\.lynx_1\.0\.\d+\.tar\.gz$/;
        const foundFiles = findFiles(aPath, pattern);

        if (foundFiles.length === 0) {
            console.error('Error: devtool.frontend.lynx not found.');
            process.exit(1);
        }

        // Sort and get the latest file
        const sortedFiles = sortByVersion(foundFiles);
        const latestFile = sortedFiles[sortedFiles.length - 1];

        console.log(`The latest devtool.frontend.lynx dist: ${latestFile}`);

        // Ensure target directory exists
        if (!fs.existsSync(bPath)) {
            fs.mkdirSync(bPath, { recursive: true });
        }

        // Delete old dist files
        console.log('Deleting old dist...');
        const oldFiles = findFiles(bPath, pattern);
        oldFiles.forEach(file => {
            console.log(`Removing: ${file}`);
            fs.unlinkSync(file);
        });

        // Copy the latest dist
        console.log('Copying the latest dist...');
        const filename = path.basename(latestFile);
        const destPath = path.join(bPath, filename);

        fs.copyFileSync(latestFile, destPath);
        console.log(`Copied: ${latestFile} -> ${destPath}`);

        console.log('Sync devtools output successfully!');
    } catch (error) {
        console.error('sync-devtools-output failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main, findFiles, sortByVersion };