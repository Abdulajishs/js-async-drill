const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname, 'jsonFiles')

function createDir() {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                console.log("Error creating directory", err);
                return reject(err)
            }
            resolve('directory is created')
        })
    })
}

function createMultipleFiles() {
    return new Promise((resolve, reject) => {
        let promises = [];
        for (let i = 0; i < 5; i++) {
            let fileName = `file_${Math.floor(Math.random() * 1000)}.json`
            let filePath = path.join(__dirname, 'jsonFiles', fileName);
            let data = JSON.stringify({ user: 'Random', id: i + 1 });

            promises.push(
                new Promise((res, rej) => {
                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            console.log(err);
                            return rej(err)
                        }
                        console.log('File is created', fileName);
                        res()
                    })
                })
            )
        }
        Promise.all(promises).then(() => {
            resolve('All files are created')
        }).catch((err) => {
            reject(err)
        })
    })
}

function readAndDeleteFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                console.log('Error reading ', err)
                return reject(err)
            }

            let deletePromises = files.map((file) => {
                return new Promise((res, rej) => {
                    fs.unlink(path.join(__dirname, 'jsonFiles', file), (err) => {
                        if (err) {
                            console.log("Error deleting", err);
                            return rej(err)
                        }
                        console.log(`${file} deleted`)
                        res()
                    })
                })
            })

            Promise.all(deletePromises).then(() => {
                resolve('All files are deleted')
            }).catch((err) => {
                reject(err)
            })

        })
    })
}

module.exports = function createAndDeleteFiles() {
    createDir()
        .then((dirMessage) => {
            console.log(dirMessage);
            return createMultipleFiles();
        })
        .then((createMessage) => {
            console.log(createMessage);
            return readAndDeleteFiles();
        })
        .then((deleteMessage) => {
            console.log(deleteMessage);
        })
        .catch((error) => {
            console.log('Error in createAndDeleteFiles:', error);
        });
    // try {
    //     let dir = await createDir();
    //     console.log(dir);

    //     let createMsg = await createMultiplefiles();
    //     console.log(createMsg);

    //     let deletedMsg = await readAndDeleteFiles();
    //     console.log(deletedMsg);


    // } catch (error) {
    //     console.log(error)
    // }
}

