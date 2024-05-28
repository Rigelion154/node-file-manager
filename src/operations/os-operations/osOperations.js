import {cpus, userInfo, EOL} from 'os'
import { getColoredMessage} from "../../outputs/outputsOperations.js";

export const getOsData = (input) => {
    const {username, homedir} = userInfo()
    const cpInfo = cpus().map(({model, speed}) => ({
        model,
        speed: `${speed / 1000} GHz`,
    }));

    const osData = {
        EOL: JSON.stringify(EOL),
        cpus: JSON.stringify(cpInfo),
        homedir: homedir,
        username: username,
        architecture: process.arch,
    }

    return osData[input] ? getColoredMessage(`${osData[input]}`, 42) : getColoredMessage('No such data', 41);
}