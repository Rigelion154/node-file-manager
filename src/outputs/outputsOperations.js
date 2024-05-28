const cliArguments = process.argv.slice(2)

export const userNameCli = cliArguments.find(arg => arg.includes('username='));
const username = userNameCli ? userNameCli.split('=')[1] : 'Guest';

export const getColoredMessage = (message, color) => console.log(`\x1b[${color}m${message}\x1b[0m`)

export const getGreetingMessage = () => getColoredMessage(`Welcome to the File Manager, ${username}!`, 44);
export const getCurrentDirectory = () => getColoredMessage(`You are currently in ${process.cwd()}`, 45)
export const getInvalidOperationMessage = () => getColoredMessage('Operation failed', 41)
export const getGoodByeMessage = () => getColoredMessage(`Goodbye ${username}`, 44)

