import {createReadStream, createWriteStream} from "fs";
import {getSplitInput} from "./getSplittedInput.js";

export const getStreams = (input) => {
    const {fromPath, toPath} = getSplitInput(input)
    const rs = createReadStream(fromPath)
    const ws = createWriteStream(toPath)

    return {rs, ws}
}