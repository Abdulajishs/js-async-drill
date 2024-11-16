const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname, 'jsonFiles') 

function createDir() {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log("Error creating directory", err);
                return
            }
        })
        resolve('directory is created')
    })
}

function createMultiplefiles() {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 5; i++) {
            let fileName = `file_${Math.floor(Math.random() * 1000)}.json`
            let filePath = path.join(__dirname, 'jsonFiles', fileName);
            let data = JSON.stringify({ user: 'Random', id: i + 1 });

            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('File is created', fileName)
            })
        }
        resolve('All files are created')
    })
}

function readAndDeleteFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                console.log('Error reading ', err)
                return
            }

            files.forEach((file) => {
                fs.unlink(path.join(__dirname, 'jsonFiles', file), (err) => {
                    if (err) {
                        console.log("Error deleting", err);
                        return
                    }
                    console.log(`${file} deleted`)
                })
            })
        })           
        resolve('All files are deleted')
        })
}

module.exports =  async function createAndDeleteFiles(params) {
    try {
        await createDir();

        await createMultiplefiles();

        await readAndDeleteFiles();

    } catch (error) {
        console.log(error)
    }
}

