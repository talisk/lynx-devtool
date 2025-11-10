#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');
const { detectOS, detectArch } = require('./fetch-depot-tools.js');

// Change to devtools-frontend-lynx directory
const devtoolsDir = path.join(__dirname, '..', 'packages', 'devtools-frontend-lynx');
process.chdir(devtoolsDir);

const currentDir = process.cwd();
const OS_TYPE = detectOS();
const ARCH = detectArch();

console.log(`Detected OS: ${OS_TYPE}`);
console.log(`Detected architecture: ${ARCH}`);

function resolve(relativePath) {
    return path.join(currentDir, relativePath);
}

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

// Function to run the fetch-depot-tools script
function runFetchDepotTools() {
    console.log('Running fetch-depot-tools...');
    try {
        require('./fetch-depot-tools.js').main();
    } catch (error) {
        console.error('Failed to run fetch-depot-tools:', error.message);
        throw error;
    }
}

// Function to build devtools
function buildDevtool(mode = 'release') {
    console.log(`\nPreparing build mode: ${mode}`);

    // Ensure buildtools directory exists
    const buildtoolsDir = path.join('buildtools', OS_TYPE, 'gn');
    fs.mkdirSync(buildtoolsDir, { recursive: true });

    // Download gn tool if not exists
    const gnExecutable = OS_TYPE === 'windows_nt' ? 'gn.exe' : 'gn';
    const gnPath = path.join(buildtoolsDir, gnExecutable);

    if (!fs.existsSync(gnPath)) {
        console.log('Downloading gn tool...');

        // Remove existing gn directory
        if (fs.existsSync(buildtoolsDir)) {
            fs.rmSync(buildtoolsDir, { recursive: true, force: true });
        }
        fs.mkdirSync(buildtoolsDir, { recursive: true });

        let GN_PACKAGE;
        switch (OS_TYPE) {
            case 'darwin':
                switch (ARCH) {
                    case 'arm64':
                        GN_PACKAGE = 'gn/gn/mac-arm64';
                        break;
                    case 'x86_64':
                        GN_PACKAGE = 'gn/gn/mac-amd64';
                        break;
                    default:
                        throw new Error(`Unsupported Mac architecture: ${ARCH}`);
                }
                break;
            case 'linux':
                switch (ARCH) {
                    case 'x86_64':
                        GN_PACKAGE = 'gn/gn/linux-amd64';
                        break;
                    case 'arm64':
                        GN_PACKAGE = 'gn/gn/linux-arm64';
                        break;
                    default:
                        throw new Error(`Unsupported Linux architecture: ${ARCH}`);
                }
                break;
            case 'windows_nt':
                switch (ARCH) {
                    case 'x86_64':
                        GN_PACKAGE = 'gn/gn/windows-amd64';
                        break;
                    default:
                        throw new Error(`Unsupported Windows architecture: ${ARCH}`);
                }
                break;
            default:
                throw new Error(`Unsupported operating system: ${OS_TYPE}`);
        }

        console.log(`Detected system: ${OS_TYPE}, architecture: ${ARCH}`);
        console.log(`Using package: ${GN_PACKAGE}`);

        const ensureFile = `${GN_PACKAGE} latest`;
        try {
            runCommand(`cipd ensure -root "${buildtoolsDir}" -ensure-file -`, {
                input: ensureFile,
                stdio: ['pipe', 'inherit', 'inherit']
            });
        } catch (error) {
            console.warn('Failed to download gn via cipd, trying alternative approach...');
            // Could implement alternative download method here if needed
            throw error;
        }
    }

    // Set executable permissions
    if (OS_TYPE !== 'windows_nt') {
        try {
            fs.chmodSync(gnPath, '755');
        } catch (error) {
            console.warn('Failed to set executable permissions on gn');
        }
    }

    // Build arguments
    const isOfficialBuild = mode === 'release' ? 'true' : 'false';
    const isDebug = mode === 'debug' ? 'true' : 'false';
    const gnArgs = `is_official_build=${isOfficialBuild} is_debug=${isDebug}`;

    // Generate build files
    const gnCommand = `"${gnPath}" gen out/Default --args="${gnArgs}"`;
    runCommand(gnCommand);

    // Build
    console.log('\nBuilding...');

    // Try different ninja locations in order of preference
    const ninjaLocations = [
        path.join(resolve('third_party/ninja'), OS_TYPE === 'windows_nt' ? 'ninja.exe' : 'ninja'),
        path.join(resolve('buildtools/depot_tools'), OS_TYPE === 'windows_nt' ? 'ninja.exe' : 'ninja'),
        'autoninja',
        'ninja'
    ];

    let buildSuccess = false;
    for (const ninjaCmd of ninjaLocations) {
        try {
            if (ninjaCmd === 'autoninja' || ninjaCmd === 'ninja') {
                runCommand(`${ninjaCmd} -C out/Default`);
            } else if (fs.existsSync(ninjaCmd)) {
                runCommand(`"${ninjaCmd}" -C out/Default`);
            } else {
                continue;
            }
            buildSuccess = true;
            break;
        } catch (error) {
            console.log(`Failed to build with ${ninjaCmd}, trying next option...`);
        }
    }

    if (!buildSuccess) {
        throw new Error('Could not find a working ninja executable');
    }
}

// Function to copy static files and create output
function copyStaticFilesToDir() {
    const dirPath = path.join('out', 'Default', 'gen', 'front_end');
    const pluginDir = path.join(dirPath, 'plugin');
    const traceDir = path.join(dirPath, 'trace');

    // Create directories
    fs.mkdirSync(pluginDir, { recursive: true });
    fs.mkdirSync(traceDir, { recursive: true });

    const staticPath = resolve('static');

    if (fs.existsSync(staticPath)) {
        // Copy directories
        const pluginSrc = path.join(staticPath, 'plugin');
        const traceSrc = path.join(staticPath, 'trace');

        if (fs.existsSync(pluginSrc)) {
            copyRecursive(pluginSrc, pluginDir);
        }
        if (fs.existsSync(traceSrc)) {
            copyRecursive(traceSrc, traceDir);
        }

        // Copy files
        const filesToCopy = [
            'apexcharts.js',
            'base64js.min.js',
            'inflate.min.js',
            'compare-versions.js'
        ];

        filesToCopy.forEach(file => {
            const srcFile = path.join(staticPath, file);
            const destFile = path.join(dirPath, file);
            if (fs.existsSync(srcFile)) {
                fs.copyFileSync(srcFile, destFile);
            }
        });
    }

    console.log(`Current directory: ${process.cwd()}`);

    // Remove existing output directory
    const outputDir = 'output';
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    const timestamp = Math.floor(Date.now() / 1000);
    const frontEndTimestampDir = path.join(outputDir, `front_end_${timestamp}`);

    fs.mkdirSync(frontEndTimestampDir, { recursive: true });

    // Copy generated front_end files
    const genFrontEndDir = path.join('out', 'Default', 'gen', 'front_end');
    if (fs.existsSync(genFrontEndDir)) {
        copyRecursive(genFrontEndDir, frontEndTimestampDir);
    }

    // Copy inspector.html
    const inspectorSrc = path.join('out', 'Default', 'gen', 'front_end', 'inspector.html');
    const inspectorDest = path.join(outputDir, 'inspector.html');

    if (fs.existsSync(inspectorSrc)) {
        fs.copyFileSync(inspectorSrc, inspectorDest);

        // Update paths in inspector.html
        let content = fs.readFileSync(inspectorDest, 'utf8');
        content = content.replace(/\.\//g, `./front_end_${timestamp}/`);
        fs.writeFileSync(inspectorDest, content);
    }

    // Create tar.gz archive
    process.chdir(outputDir);

    const frontEndDir = `front_end_${timestamp}`;
    const inspectorFile = 'inspector.html';

    if (fs.existsSync(frontEndDir) && fs.existsSync(inspectorFile)) {
        const archiveName = `devtool.frontend.lynx_1.0.${timestamp}.tar.gz`;

        // Use tar command if available
        try {
            runCommand(`tar -czf "${archiveName}" "${inspectorFile}" "${frontEndDir}"`);
            console.log(`Created archive: ${archiveName}`);
        } catch (error) {
            console.warn('tar command failed, trying alternative archive method...');
            // Could implement alternative archiving method here if needed
            throw error;
        }
    } else {
        throw new Error('Required files not found for packaging');
    }
}

// Utility function to copy directory recursively
function copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Main function
function main(mode = 'release') {
    try {
        // Ensure depot_tools is available
        const depotToolsPath = resolve('buildtools/depot_tools');
        if (fs.existsSync(depotToolsPath)) {
            process.env.PATH = `${depotToolsPath}${path.delimiter}${process.env.PATH}`;
        }

        // Run fetch depot tools first
        runFetchDepotTools();

        // Build devtools
        buildDevtool(mode);

        // Copy static files and create output
        copyStaticFilesToDir();

        console.log('build-lynx-devtools completed successfully!');
    } catch (error) {
        console.error('build-lynx-devtools failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    const mode = process.argv[2] || 'release';
    main(mode);
}

module.exports = { main, buildDevtool, copyStaticFilesToDir };