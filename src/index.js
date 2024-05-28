import {homedir} from 'os';
import readline from 'readline/promises';
import {
    getCurrentDirectory, getGoodByeMessage, getInvalidOperationMessage,
    getGreetingMessage,
    userNameCli,
} from "./outputs/outputsOperations.js";
import {
    copyFile,
    createFile,
    deleteFile,
    renameFile,
    moveFile,
    getFilesList, readFile
} from "./operations/fs-operations/fsOperations.js";
import {getOsData} from "./operations/os-operations/osOperations.js";
import {getPreviousDirectory, goToPath} from "./operations/path-operations/pathOperations.js";
import {getHash} from "./operations/hash-operations/hashOperations.js";
import {zipFile} from "./operations/zip-operations/zipOperations.js";

const rl = readline.createInterface({input: process.stdin, output: process.stdout})
const fileManagerApp = async () => {
    process.chdir(homedir());

    if (userNameCli) {
        getGreetingMessage();
        getCurrentDirectory();
        rl.on('line', async (input) => {
            try {
                switch (true) {
                    case input.trim() === 'ls':
                        await getFilesList();
                        break;
                    case input.trim() === 'up':
                        getPreviousDirectory();
                        break;
                    case input.trim().startsWith('cd'):
                        goToPath(input.trim().slice(3))
                        break;
                    case input.trim().startsWith('cat'):
                        readFile(input.trim().slice(4))
                        break;
                    case input.trim().startsWith('add'):
                        await createFile(input.trim().slice(4))
                        break;
                    case input.trim().startsWith('rm'):
                        await deleteFile(input.trim().slice(3))
                        break;
                    case input.trim().startsWith('rn'):
                        await renameFile(input)
                        break;
                    case input.trim().startsWith('cp'):
                        await copyFile(input)
                        break;
                    case input.trim().startsWith('mv'):
                        await moveFile(input)
                        break;
                    case input.trim().startsWith("os"): {
                        getOsData(input.slice(5).trim())
                        break;
                    }
                    case input.trim().startsWith('hash'):
                        await getHash(input.trim().slice(5))
                        break;
                    case input.trim().startsWith('compress'):
                        await zipFile(input, 'compress');
                        break;
                        case input.trim().startsWith('decompress'):
                        await zipFile(input, 'decompress');
                        break;

                    case input.trim() === '.exit': {
                        rl.close()
                        break;
                    }
                    default: {
                        getInvalidOperationMessage()
                    }
                }
            } catch (err) {
                getInvalidOperationMessage()
            }
            getCurrentDirectory();
        })
        rl.on('close', getGoodByeMessage)
    }
};

await fileManagerApp();