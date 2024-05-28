export const getPreviousDirectory = () => process.chdir('..')

export const goToPath = (path) => {
    process.chdir(path)
}