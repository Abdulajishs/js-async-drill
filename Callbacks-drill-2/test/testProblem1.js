const problem1 = require('../problem1.js');

problem1.createDir().then(() => {
    return problem1.createMultipleFiles();
}).then(() => {
    return problem1.deleteFiles();
}).then(() => {
    console.log("All operations done successfully.");
}).catch((err) => {
    console.log(err);
});
