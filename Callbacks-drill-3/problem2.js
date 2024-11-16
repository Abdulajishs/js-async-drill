const fs = require('fs');
const path = require('path');

function readLipsum() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'lipsum.txt'), (err, data) => {
            if (err) {
                return reject(err)
            }
            console.log('Successfully read lipsum.txt');
            let upperCaseData = data.toString().toUpperCase()
            resolve(upperCaseData)  
        })
    })
}

function convertAndStoreFilenames(upperCaseData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, 'uppercaseLipsum.txt'), upperCaseData, (err) => {
            if (err) {
                return reject(err)
            }
            fs.appendFile(path.join(__dirname, 'filename.txt'), 'uppercaseLipsum.txt\n', (err) => {
                if (err) {
                    return reject(err)
                }
                resolve("uppercaseLipsum is added to filenames.txt")
            })
        })
    })
}

function createSentenceAndStoreFilename() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'uppercaseLipsum.txt'), (err, data) => {
            if (err) {
                return reject(err)
            }
            let sentences = data.toString().toLowerCase().split('.');
            let sentencesData = sentences.join('\n');
            fs.writeFile(path.join(__dirname, 'sentences.txt'), sentencesData, (err) => {
                if (err) {
                    return reject(err)
                }
                console.log('Successfully read sentences.txt');

                fs.appendFile(path.join(__dirname, 'filename.txt'), 'sentences.txt\n', (err) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve("Sentence file created and store the name in Filenames")
                })
            })
        })
    })
}

function createAndStoreSortFilename() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'sentences.txt'), (err, data) => {
            if (err) {
                return reject(err)
            }
            let sortContent = data.toString().split('\n').sort().join('\n');
            fs.writeFile(path.join(__dirname, 'sorted.txt'), sortContent, err => {
                if (err) {
                    return reject(err)
                }
                fs.appendFile(path.join(__dirname, 'filename.txt'), 'sorted.txt\n', err => {
                    if (err) {
                        return reject(err)
                    }
                    resolve("Sort file created and store name in Filenames")
                })
            })
        })
    })
}

function deleteFiles() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'filename.txt'), (err, filesList) => {
            if (err) {
                return reject(err)
            }
            let filesToDelete = filesList.toString().trim().split('\n');

            Promise.all(
                filesToDelete.map((file) => {
                    return new Promise((res, rej) => {
                        fs.unlink(path.join(__dirname,file), (err) => {
                            if (err) {
                                return rej(err)
                            }
                            console.log(`${file} is deleted`);
                            res()
                        })
                    })
                })
            )
            .then(()=>resolve("All Files are deleted"))
            .catch(reject)
        })
    })
}

module.exports = async function processFiles() {
    try {
        let data = await readLipsum();
        console.log(await convertAndStoreFilenames(data))
        console.log(await createSentenceAndStoreFilename())
        console.log(await createAndStoreSortFilename())
        console.log(await deleteFiles())
    } catch (error) {
        console.log(error)
    }
}
