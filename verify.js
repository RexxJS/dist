#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read registry.txt and parse expected files
function parseRegistry() {
    const registryPath = path.join(__dirname, 'registry.txt');
    if (!fs.existsSync(registryPath)) {
        console.error('❌ registry.txt not found');
        process.exit(1);
    }
    
    const content = fs.readFileSync(registryPath, 'utf8');
    const expectedFiles = new Set();
    
    content.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const parts = line.split(',');
            if (parts.length >= 3) {
                const urlTemplate = parts[2];
                // Extract filename from URL template
                // Example: https://raw.githubusercontent.com/RexxJS/dist/{tag}/addresses/sqlite3-address.bundle.js
                const urlPath = urlTemplate.split('/').slice(-2).join('/'); // addresses/sqlite3-address.bundle.js
                const cleanPath = urlPath.replace('{tag}/', ''); // addresses/sqlite3-address.bundle.js
                expectedFiles.add(cleanPath);
            }
        }
    });
    
    return expectedFiles;
}

// Get actual files in dist directory
function getActualFiles() {
    const actualFiles = new Set();
    
    // Check addresses directory
    const addressesDir = path.join(__dirname, 'addresses');
    if (fs.existsSync(addressesDir)) {
        fs.readdirSync(addressesDir).forEach(file => {
            if (file.endsWith('.bundle.js') || file.endsWith('.js')) {
                actualFiles.add(`addresses/${file}`);
            }
        });
    }
    
    // Check functions directory
    const functionsDir = path.join(__dirname, 'functions');
    if (fs.existsSync(functionsDir)) {
        fs.readdirSync(functionsDir).forEach(file => {
            if (file.endsWith('.bundle.js') || file.endsWith('.js')) {
                actualFiles.add(`functions/${file}`);
            }
        });
    }
    
    return actualFiles;
}

// Verify metadata canonical names match registry entries
function verifyMetadata() {
    const registryPath = path.join(__dirname, 'registry.txt');
    const content = fs.readFileSync(registryPath, 'utf8');
    const metadataIssues = [];
    
    content.split('\n').forEach((line, lineNum) => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const parts = line.split(',');
            if (parts.length >= 3) {
                const moduleName = parts[0];
                const urlTemplate = parts[2];
                
                // Extract filename from URL template
                const urlPath = urlTemplate.split('/').slice(-2).join('/');
                const cleanPath = urlPath.replace('{tag}/', '');
                const filePath = path.join(__dirname, cleanPath);
                
                if (fs.existsSync(filePath)) {
                    try {
                        // Read the file and extract metadata
                        const fileContent = fs.readFileSync(filePath, 'utf8');
                        
                        // Look for @rexxjs-meta=FUNCTION_NAME pattern
                        const metaMatch = fileContent.match(/@rexxjs-meta=([A-Z_]+)/);
                        if (metaMatch) {
                            const metaFunctionName = metaMatch[1];
                            
                            // Try to evaluate the metadata function
                            try {
                                // Create a sandbox to safely evaluate the file
                                const vm = require('vm');
                                const sandbox = {
                                    module: { exports: {} },
                                    exports: {},
                                    require: require,
                                    global: {},
                                    console: console,
                                    process: process
                                };
                                
                                vm.createContext(sandbox);
                                vm.runInContext(fileContent, sandbox);
                                
                                // Try to get the metadata function
                                const metaFunction = sandbox[metaFunctionName] || sandbox.global[metaFunctionName];
                                if (typeof metaFunction === 'function') {
                                    const metadata = metaFunction();
                                    if (metadata && metadata.canonical) {
                                        // Extract the canonical name (remove org.rexxjs/ prefix if present)
                                        const canonicalName = metadata.canonical.replace(/^org\.rexxjs\//, '');
                                        if (canonicalName !== moduleName) {
                                            metadataIssues.push({
                                                file: cleanPath,
                                                line: lineNum + 1,
                                                registryName: moduleName,
                                                canonicalName: canonicalName,
                                                fullCanonical: metadata.canonical
                                            });
                                        }
                                    }
                                }
                            } catch (evalError) {
                                // Skip files that can't be evaluated safely
                                console.log(`⚠️  Could not evaluate metadata for ${cleanPath}: ${evalError.message}`);
                            }
                        }
                    } catch (readError) {
                        console.log(`⚠️  Could not read ${cleanPath}: ${readError.message}`);
                    }
                }
            }
        }
    });
    
    return metadataIssues;
}

// Main verification
function verify() {
    console.log('🔍 Verifying dist directory against registry.txt...\n');
    
    const expectedFiles = parseRegistry();
    const actualFiles = getActualFiles();
    
    console.log(`📋 Registry expects ${expectedFiles.size} files`);
    console.log(`📁 Found ${actualFiles.size} actual files\n`);
    
    // Files in registry but missing from filesystem
    const missing = [];
    expectedFiles.forEach(file => {
        if (!actualFiles.has(file)) {
            missing.push(file);
        }
    });
    
    // Files in filesystem but not in registry
    const unregistered = [];
    actualFiles.forEach(file => {
        if (!expectedFiles.has(file)) {
            unregistered.push(file);
        }
    });
    
    // Check metadata canonical names
    console.log('🔍 Verifying metadata canonical names...\n');
    const metadataIssues = verifyMetadata();
    
    // Report file sync results
    let filesInSync = true;
    if (missing.length === 0 && unregistered.length === 0) {
        console.log('✅ All files match! Registry and filesystem are in sync.');
    } else {
        filesInSync = false;
        
        if (missing.length > 0) {
            console.log(`❌ Missing files (in registry but not found):`);
            missing.forEach(file => console.log(`   - ${file}`));
            console.log();
        }
        
        if (unregistered.length > 0) {
            console.log(`⚠️  Unregistered files (found but not in registry):`);
            unregistered.forEach(file => console.log(`   + ${file}`));
            console.log();
        }
        
        console.log(`📊 File Summary: ${missing.length} missing, ${unregistered.length} unregistered`);
    }
    
    // Report metadata results
    if (metadataIssues.length === 0) {
        console.log('✅ All metadata canonical names match registry entries.');
    } else {
        console.log(`❌ Metadata canonical name mismatches:`);
        metadataIssues.forEach(issue => {
            console.log(`   ${issue.file} (line ${issue.line}):`);
            console.log(`     Registry: "${issue.registryName}"`);
            console.log(`     Canonical: "${issue.canonicalName}" (${issue.fullCanonical})`);
        });
        console.log();
        console.log(`📊 Metadata Summary: ${metadataIssues.length} canonical name mismatches`);
    }
    
    return filesInSync && metadataIssues.length === 0;
}

// Run verification
if (require.main === module) {
    const success = verify();
    process.exit(success ? 0 : 1);
}

module.exports = { verify, parseRegistry, getActualFiles, verifyMetadata };