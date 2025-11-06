#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

// Change to devtools-frontend-lynx directory
const devtoolsDir = path.join(__dirname, '..', 'packages', 'devtools-frontend-lynx');
process.chdir(devtoolsDir);

const currentDir = process.cwd();

// Robust OS detection
function detectOS() {
    const platform = os.platform();
    switch (platform) {
        case 'darwin':
            return 'darwin';
        case 'linux':
            return 'linux';
        case 'win32':
            return 'windows_nt';
        default:
            return 'unknown';
    }
}

// Robust architecture detection
function detectArch() {
    const arch = os.arch();
    switch (arch) {
        case 'x64':
        case 'x86_64':
            return 'x86_64';
        case 'arm64':
            return 'arm64';
        default:
            return arch;
    }
}

const OS_TYPE = detectOS();
const ARCH = detectArch();

console.log(`Detected OS: ${OS_TYPE}`);
console.log(`Detected architecture: ${ARCH}`);

function resolve(relativePath) {
    return path.join(currentDir, relativePath);
}

const depotToolsPath = resolve('buildtools/depot_tools');

// Function to check if command exists
function commandExists(command) {
    try {
        execSync(`where ${command}`, { stdio: 'ignore' });
        return true;
    } catch (error) {
        try {
            execSync(`which ${command}`, { stdio: 'ignore' });
            return true;
        } catch (error2) {
            return false;
        }
    }
}

// Function to run command with proper error handling
function runCommand(command, options = {}) {
    try {
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

// Function to fetch ninja
function fetchNinja() {
    const thirdPartyPath = resolve('third_party');
    const ninjaPath = path.join(thirdPartyPath, 'ninja');

    if (!fs.existsSync(ninjaPath)) {
        console.log('Downloading ninja...');
        fs.mkdirSync(ninjaPath, { recursive: true });

        let NINJA_PACKAGE;
        switch (OS_TYPE) {
            case 'darwin':
                switch (ARCH) {
                    case 'arm64':
                        NINJA_PACKAGE = 'fuchsia/third_party/ninja/mac-arm64';
                        break;
                    case 'x86_64':
                        NINJA_PACKAGE = 'fuchsia/third_party/ninja/mac-amd64';
                        break;
                    default:
                        throw new Error(`Unsupported Mac architecture: ${ARCH}`);
                }
                break;
            case 'linux':
                switch (ARCH) {
                    case 'x86_64':
                        NINJA_PACKAGE = 'fuchsia/third_party/ninja/linux-amd64';
                        break;
                    case 'arm64':
                        NINJA_PACKAGE = 'fuchsia/third_party/ninja/linux-arm64';
                        break;
                    default:
                        throw new Error(`Unsupported Linux architecture: ${ARCH}`);
                }
                break;
            case 'windows_nt':
                NINJA_PACKAGE = 'fuchsia/third_party/ninja/windows-amd64';
                break;
            default:
                throw new Error(`Unsupported operating system: ${OS_TYPE}`);
        }

        console.log(`Using ninja package: ${NINJA_PACKAGE}`);

        // Check if cipd is available
        if (!commandExists('cipd')) {
            console.log('cipd not found, trying to use depot_tools cipd...');
            if (fs.existsSync(depotToolsPath)) {
                const cipdPath = path.join(depotToolsPath, OS_TYPE === 'windows_nt' ? 'cipd.exe' : 'cipd');
                if (fs.existsSync(cipdPath)) {
                    process.env.PATH = `${depotToolsPath}${path.delimiter}${process.env.PATH}`;
                }
            }
        }

        const ensureFile = `${NINJA_PACKAGE} latest`;
        try {
            runCommand(`cipd ensure -root "${ninjaPath}" -ensure-file -`, {
                input: ensureFile,
                stdio: ['pipe', 'inherit', 'inherit']
            });
            console.log(`ninja downloaded successfully to: ${ninjaPath}`);
        } catch (error) {
            console.warn('Failed to download ninja via cipd, continuing without it...');
        }
    } else {
        console.log(`ninja already exists at: ${ninjaPath}`);
    }
}

// Main function
function main() {
    // Install depot_tools
    if (!fs.existsSync(depotToolsPath)) {
        console.log('Downloading depot_tools...');

        // Use git clone with proper Windows path handling
        const gitCommand = `git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git "${depotToolsPath}" --depth=1`;
        runCommand(gitCommand);

        console.log(`depot_tools downloaded successfully to: ${depotToolsPath}`);
    } else {
        console.log(`depot_tools already exists at: ${depotToolsPath}`);
    }

    // Add depot_tools to PATH
    process.env.PATH = `${depotToolsPath}${path.delimiter}${process.env.PATH}`;

    // Install ninja
    fetchNinja();

    console.log('fetch-depot-tools completed successfully!');
}

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error('fetch-depot-tools failed:', error.message);
        process.exit(1);
    }
}

module.exports = { main, fetchNinja, detectOS, detectArch };