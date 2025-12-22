#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const decompress = require('decompress');

const REPO_OWNER = 'lynx-family';
const REPO_NAME = 'lynx-devtool';
const RELEASE_NAME_PREFIX = 'DevTools Frontend (lynx) build';

const outputDir = path.join(__dirname, '..', 'packages', 'devtools-frontend-lynx', 'output');

/**
 * Make HTTPS GET request
 */
function httpsGet(url, options = {}) {
    return new Promise((resolve, reject) => {
        const headers = {
            'User-Agent': 'Node.js',
            ...options.headers
        };

        https.get(url, { headers }, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                // Handle redirect
                return httpsGet(res.headers.location, options).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                return;
            }

            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(options.binary ? res : JSON.parse(data));
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

/**
 * Download binary file
 */
function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        const headers = {
            'User-Agent': 'Node.js',
            'Accept': 'application/octet-stream'
        };

        https.get(url, { headers }, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                // Handle redirect
                file.close();
                fs.unlinkSync(destPath);
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                file.close();
                fs.unlinkSync(destPath);
                reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                return;
            }

            res.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve();
            });

            file.on('error', (err) => {
                file.close();
                fs.unlinkSync(destPath);
                reject(err);
            });
        }).on('error', (err) => {
            file.close();
            if (fs.existsSync(destPath)) {
                fs.unlinkSync(destPath);
            }
            reject(err);
        });
    });
}

/**
 * Get latest DevTools Frontend release
 */
async function getLatestDevToolsRelease() {
    console.log('Fetching releases from GitHub...');

    const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
    const releases = await httpsGet(apiUrl);

    // Find releases that match the DevTools Frontend pattern
    const devtoolsReleases = releases.filter(release =>
        release.name && release.name.startsWith(RELEASE_NAME_PREFIX)
    );

    if (devtoolsReleases.length === 0) {
        throw new Error(`No releases found matching "${RELEASE_NAME_PREFIX}"`);
    }

    // Sort by created_at to get the latest
    devtoolsReleases.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );

    const latestRelease = devtoolsReleases[0];
    console.log(`Found latest release: ${latestRelease.name}`);

    // Find the tarball asset
    const tarballAsset = latestRelease.assets.find(asset =>
        asset.name.startsWith('devtool.frontend.lynx_') &&
        asset.name.endsWith('.tar.gz')
    );

    if (!tarballAsset) {
        throw new Error('No devtool.frontend.lynx_*.tar.gz asset found in the release');
    }

    console.log(`Found asset: ${tarballAsset.name}`);
    return {
        asset: tarballAsset,
        release: latestRelease
    };
}

/**
 * Main function
 */
async function main() {
    try {
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Get latest release info
        const { asset, release } = await getLatestDevToolsRelease();

        // Download the tarball
        const tempTarball = path.join(outputDir, asset.name);
        console.log(`Downloading ${asset.name}...`);
        console.log(`Size: ${(asset.size / 1024 / 1024).toFixed(2)} MB`);

        await downloadFile(asset.browser_download_url, tempTarball);
        console.log(`Downloaded to: ${tempTarball}`);

        // Extract the tarball
        console.log('Extracting tarball...');
        await decompress(tempTarball, outputDir);
        console.log('Extraction completed!');

        // Clean up tarball
        fs.unlinkSync(tempTarball);
        console.log('Cleaned up temporary files');

        // Verify extraction
        const files = fs.readdirSync(outputDir);
        const frontEndDir = files.find(f => f.startsWith('front_end_'));
        const inspectorHtml = files.find(f => f === 'inspector.html');

        if (frontEndDir) {
            console.log(`✓ Found directory: ${frontEndDir}`);
        }
        if (inspectorHtml) {
            console.log(`✓ Found file: ${inspectorHtml}`);
        }

        console.log('\n✓ DevTools Frontend downloaded and extracted successfully!');
        console.log(`  Release: ${release.name}`);
        console.log(`  Output: ${outputDir}`);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };
