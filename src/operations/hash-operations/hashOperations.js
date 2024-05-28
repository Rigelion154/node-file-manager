import {createHash} from 'crypto'
import {getColoredMessage} from "../../outputs/outputsOperations.js";
export const getHash = (path) => {
   const hash =  createHash('sha256', path).digest('hex')
    getColoredMessage(hash, 42)
}