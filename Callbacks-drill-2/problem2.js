const fsPromises = require('fs/promises')
const path = require('path');

let filenamesPath = path.join(__dirname, 'filenames.txt')
async function readFile() {
    try {
        let fileContent = await fsPromises.readFile(path.join(__dirname, 'lipsum.txt'), 'utf-8')
        return fileContent
    } catch (error) {
        console.error('Error in readFile:', error);
    }
}

async function covertAndStoreFilename(fileContent) {
    try {
        let uppercase = fileContent.toUpperCase();
        let newFile = 'uppercaseContent.txt'
        await fsPromises.writeFile(path.join(__dirname, newFile), uppercase);

        await fsPromises.appendFile(filenamesPath, `${newFile}\n`)

        return newFile
    } catch (error) {
        console.error('Error in covertAndStoreFilename:', error);
    }

}

async function createSentenceFile(filename) {
    try {
        let fileContent = await fsPromises.readFile(path.join(__dirname, filename))
        let sentences = fileContent.toString().toLowerCase().split(".").join("\n")

        let newFile = 'sentences.txt';
        await fsPromises.writeFile(path.join(__dirname, newFile), sentences);

        await fsPromises.appendFile(filenamesPath, `${newFile}\n`);

        console.log('sentences file is created');
        
        return newFile
    } catch (error) {
        console.error('Error in createSentenceFile:', error);
    }
}

async function createSortFile(filename) {
    try {
        let fileContent = await fsPromises.readFile(path.join(__dirname, filename))
        let sortContent = fileContent.toString().split('\n').sort().join('\n');

        let newFile = 'sorted.txt';
        await fsPromises.writeFile(path.join(__dirname, newFile), sortContent);

        await fsPromises.appendFile(filenamesPath, `${newFile}\n`);

        console.log('sort file is created')
    } catch (error) {
        console.error('Error in createSortFile:', error);
    }

}

async function deleteFiles() {
    try {
        let files = await fsPromises.readFile(filenamesPath);

        let filesList = files.toString().split('\n').filter((file)=>file.trim() !== '');
        for (let i = 0; i < filesList.length; i++) {
            try {
                await fsPromises.unlink(path.join(__dirname, filesList[i]))
                console.log(`${filesList[i]} is deleted`);
            } catch (error) {
                console.error(`Error deleting file ${filesList[i]}:`, err);
            }
        }
    } catch (error) {
        console.error('Error in deleteFiles:', error);
    }
}

module.exports = async function processFiles() {
    try {
        let fileContent = await readFile();

        let uppercaseFile = await covertAndStoreFilename(fileContent);

        let sentencesFile = await createSentenceFile(uppercaseFile);

        await createSortFile(sentencesFile);

        await deleteFiles()
    } catch (error) {
        console.log(error)
    }

}

