import {open, unlink, rename, lstat} from 'fs/promises';
import { createReadStream} from 'fs';
import {pipeline} from 'stream'
import {getColoredMessage} from "../../outputs/outputsOperations.js";
import {readdir} from "node:fs/promises";
import {getStreams} from "../../utils/getStreams.js";
import {getSplitInput} from "../../utils/getSplittedInput.js";

export const createFile = async (path) => await open(path, 'wx');
export const deleteFile = async (path) => await unlink(path);
export const renameFile = async (input) => {
    const {fromPath, toPath} = getSplitInput(input)
    await rename(fromPath, toPath)
}

export const copyFile = async (input) => {
    const {fromPath, toPath} = getSplitInput(input)
    const {rs, ws} = getStreams(input)
    await pipeline(rs, ws, (err) => {
        if (err) {
            getColoredMessage('Error copying file', 42)
            ws.close();
        } else {
            getColoredMessage(`File ${fromPath} has been copied to ${toPath}`, 42)
        }
    });
}

export const moveFile = async (input) => {
    const {fromPath, toPath} = getSplitInput(input)
    const {rs, ws} = getStreams(input)
    await pipeline(rs, ws, (err) => {
        if (err) {
            getColoredMessage('Error moved file', 41)
            ws.close();
        } else {
            deleteFile(fromPath)
            getColoredMessage(`File ${fromPath} has been moved to ${toPath}`, 42)
        }
    });
}

export const readFile = (path) => {
    const readStream = createReadStream(path, {encoding: 'utf8'})
    readStream.pipe(process.stdout)
}

export const getFilesList = async () => {
    const dirFiles = await readdir(process.cwd());
    const typesDirFiles = await Promise.all(
        dirFiles.map(async (el) => {
            const stats = await lstat(el);
            return {Name: el, Type: stats.isDirectory() ? 'directory' : 'file'};
        })
    );
    console.table(typesDirFiles);
}