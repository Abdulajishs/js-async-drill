let problem2 = require('../problem2.js')


problem2.readFile().then((fileContent)=>{
    return problem2.convertAndStoreFilename(fileContent)
}).then((uppercaseFile)=>{
    return problem2.createSentenceFile(uppercaseFile)
}).then((sentencesFile)=>{
    return problem2.createSortFile(sentencesFile)
}).then(()=>{
    return problem2.deleteFiles()
}).catch((error)=>{
    console.log(error)
})