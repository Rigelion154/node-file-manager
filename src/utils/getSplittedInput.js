export const getSplitInput = (input) => {
    const splitInput = input.split(' ')
    const fromPath = splitInput[1]
    const toPath = splitInput[2]

    return { fromPath, toPath}
}