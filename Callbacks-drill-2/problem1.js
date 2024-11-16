const fsPromises = require('fs').promises;
const path = require('path');

let dirPath = path.join(__dirname, 'jsonFiles');

async function createDir() {
    try {
        await fsPromises.mkdir(dirPath, { recursive: true })
        console.log("Directory is created");
    } catch (error) {
        console.log("Error creating dir", error)
    }
}
async function createMultipleFiles() {
    try {
        for (let i = 0; i < 5; i++) {
            let fileName = `file_${Math.floor(Math.random() * 100)}.json`;
            let data = JSON.stringify({ name: 'random', id: 1 + i });

            await fsPromises.writeFile(path.join(dirPath, fileName), data);
            console.log(`${fileName} is created`)
        }
    } catch (error) {
        console.log('Error creating json files', error)
    }
}
async function deleteFiles() {
    try {
        let files = await fsPromises.readdir(dirPath);
        for (let file of files) {
            let filePath = path.join(dirPath, file)
            await fsPromises.unlink(filePath);
            console.log(`${file} is deleted`);
        }
    } catch (error) {
        console.log('Error deleting files', error)
    }
}
async function deleteDirectory() {
    try {
        await fsPromises.rm(dirPath, { recursive: true });
        console.log('Directory deleted successfully')
    } catch (error) {
        console.log("Error deleting directory", error)
    }
}

module.exports = async function createAndDeleteFiles() {
    try {
        await createDir();

        await createMultipleFiles();

        await deleteFiles();

        await deleteDirectory();

        console.log('All files are created and deleted')

    } catch (error) {
        console.log(error)
    }
}
