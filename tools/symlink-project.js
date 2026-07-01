import fs from 'node:fs';
import { resolve } from 'node:path';

const configFile = "./project-config.json"
const moduleDirectory = "professional";
const buildDirectory = './dist';

function getConfigPaths() {

    if (!fs.existsSync(configFile)) {
        throw new Error(`Could not find ${configFile}`);
    }
    const config = JSON.parse(
        fs.readFileSync(configFile, "utf-8")
    );

    const { foundryPath, foundryDataPath } = config;

    if (!foundryPath) {
        throw new Error(`Parameter "foundryPath" is not declared in ${configFile}`);
    }

    if (!foundryDataPath) {
        throw new Error(`Parameter "foundryDataPath" is not declared in ${configFile}`);
    }

    if (!fs.existsSync(resolve(foundryPath))) {
        throw new Error(`Foundry directory could not be found. Check "foundryPath" parameter in ${configFile}`);
    }

    if (!fs.existsSync(resolve(foundryDataPath))) {
        throw new Error(`Foundry data directory could not be found. Check "foundryDataPath" parameter in ${configFile}`);
    }

    return {
        foundryPath: resolve(foundryPath),
        foundryDataPath: resolve(foundryDataPath)
    };
}

function handleSymlink() {
    const action = process.argv[2];
    if (!["create", "clean"].includes(action)) {
        console.log('Usage: node symlink-module.js [create|clean]');
        process.exit(1);
    }
    const { foundryPath, foundryDataPath } = getConfigPaths();
    try {
        symlinkFoundry(foundryPath, action);
        symlinkModule(foundryDataPath, action);
    } catch (e){
        console.error(e);
    }
}

function symlinkFoundry(foundryPath, action){
    const symlinkDirectory = "./foundry"

    switch (action) {
        case 'create':
            if (fs.existsSync(symlinkDirectory)) {
                throw new Error(`"foundry" directory already exists in project`);
            }
            fs.symlinkSync(foundryPath, symlinkDirectory, 'junction');
            console.log(`Successfully created symlink directory: "foundry" on project root`);
            break;
        case 'clean':
            if(!fs.existsSync(symlinkDirectory)){
                throw new Error(`Could not find ${symlinkDirectory}`);
            }
            fs.rmSync(symlinkDirectory, { recursive: true, force: true });
            console.log(`Successfully removed symlink directory: "foundry" from project root`);
            break;
    }
}
function symlinkModule(foundryDataPath, action){

    const symlinkDirectory = resolve(
        foundryDataPath,
        'Data',
        'modules',
        moduleDirectory
    );

    switch (action) {
        case 'create':
            if (fs.existsSync(symlinkDirectory)) {
                throw new Error(`${symlinkDirectory} already exists`);
            }
            fs.symlinkSync(resolve(buildDirectory), symlinkDirectory, 'junction');
            console.log(`Successfully created symlink directory: ${symlinkDirectory}`);
            break;

        case 'clean':
            if(!fs.existsSync(symlinkDirectory)){
                throw new Error(`Could not find ${symlinkDirectory}`);
            }
            fs.rmSync(symlinkDirectory, { recursive: true, force: true });
            console.log(`Successfully removed symlink directory: ${symlinkDirectory}`);
            break;
    }
}

handleSymlink();