const fsPromises = require('fs').promises;
const path = require('path');

let dirPath = path.join(__dirname, 'jsonFiles');

function createDir() {
    return fsPromises.mkdir(dirPath, { recursive: true }).then(() => {
        console.log("Directory is created");
    }).catch((error) => {
        console.log("Error creating dir", error)
    })
}

function createMultipleFiles() {
    let createFilePromises = [];
    for (let i = 0; i < 5; i++) {
        let fileName = `file_${Math.floor(Math.random() * 100)}.json`;
        let data = JSON.stringify({ name: 'random', id: 1 + i });

        let promise = fsPromises.writeFile(path.join(dirPath, fileName), data).then(() => {
            console.log(`${fileName} is created`)
        }).catch((err) => {
            console.log(err);

        })

        createFilePromises.push(promise)
    }
    return Promise.all(createFilePromises).then(() => {
        console.log("All files are created")
    }).catch((err) => {
        console.log(err)
    })
}


function deleteFiles() {
    return fsPromises.readdir(dirPath).then((files) => {
        let deletePromises = files.map((file) => {
            return fsPromises.unlink(path.join(dirPath, file)).then(() => {
                console.log(`${file} is deleted`);
            }).catch((err) => {
                console.log(err);

            })
        })
        return Promise.all(deletePromises)
    }).then(() => {
        console.log("All files are deleted");
    }).catch((err) => {
        console.log(err);

    })
}

module.exports = {
    createDir,
    createMultipleFiles,
    deleteFiles,
};

