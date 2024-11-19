const fsPromises = require('fs/promises')
const path = require('path');

let filenamesPath = path.join(__dirname, 'filenames.txt')
function readFile() {
    return fsPromises.readFile(path.join(__dirname, 'lipsum.txt'), 'utf-8').then((fileContent) => {
        console.log("file read successfully")
        return fileContent
    }).catch((error) => {
        console.error('Error in readFile:', error);
    })
}

function convertAndStoreFilename(fileContent) {
    let uppercase = fileContent.toUpperCase();
    let newFile = 'uppercaseContent.txt';
    return fsPromises.writeFile(path.join(__dirname, newFile), uppercase).then(()=>{
        console.log("Uppercase file is created");
        return fsPromises.appendFile(filenamesPath, `${newFile}\n`)
    }).then(()=>{
        console.log("Uppercase filename added");
        return newFile
    }).catch((error)=>{
        console.error('Error in covertAndStoreFilename:', error);
    })
}

function createSentenceFile(filename) {
    let newFile = 'sentences.txt';
    return fsPromises.readFile(path.join(__dirname, filename)).then((fileContent)=>{
        let sentences = fileContent.toString().toLowerCase().split(".").join("\n")
        return fsPromises.writeFile(path.join(__dirname, newFile), sentences);
    }).then(()=>{
        return fsPromises.appendFile(filenamesPath, `${newFile}\n`);
    }).then(()=>{
        console.log("sentences file is appended");
        return newFile
    }).catch((error)=>{
        console.error('Error in createSentenceFile:', error);
    })
}


function createSortFile(filename) {
    let newFile = 'sorted.txt';
    return fsPromises.readFile(path.join(__dirname, filename)).then((fileContent)=>{
        let sortContent = fileContent.toString().split('\n').sort().join('\n');
        return fsPromises.writeFile(path.join(__dirname, newFile), sortContent);
    }).then(()=>{
        return fsPromises.appendFile(filenamesPath, `${newFile}\n`);
    }).then(()=>{
        console.log('Sort file create and added to filename')
    }).catch((error)=>{
        console.error('Error in createSortFile:', error);
    })
}


function deleteFiles() {
    return fsPromises.readFile(filenamesPath).then((files)=>{
        let filesList = files.toString().split('\n').filter((file) => file.trim() !== '');

        let deletePromises = filesList.map((file)=>{
            fsPromises.unlink(path.join(__dirname, file)).then(()=>{
                console.log(`${file} is deleted`);
            }).catch((error)=>{
                console.log(`Error deleting file ${file}:`, error);
            })
        })

        return Promise.all(deletePromises)
    }).then(()=>{
        console.log("All files are deleted")
    }).catch((error)=>{
        console.error('Error in deleteFiles:', error);
    })
}

module.exports = {
    readFile,
    convertAndStoreFilename,
    createSentenceFile,
    createSortFile,
    deleteFiles
};



