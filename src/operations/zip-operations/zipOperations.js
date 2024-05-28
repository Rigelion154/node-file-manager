import {createGzip, createGunzip} from 'zlib'
import {getStreams} from "../../utils/getStreams.js";

export const zipFile = (input, type) => {
    const {rs, ws} = getStreams(input)
    const zip = type === 'compress' ? createGzip() : createGunzip()
    rs.pipe(zip).pipe(ws)
}