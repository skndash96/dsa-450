// This script is responsible for creating the final data file that will be used in the app.
// using the data.js file in root dir

import fs from "fs"
import data from "../data.js"

let version = 0
try {
  version = require("../src/dataFinal.js").version
} catch (e) {
  console.error("No previous version found")
}

const OUT_PATH = "./src/dataFinal.ts"

const out = []

let i = 0
for (let topic of data) {
  const newTopic = {
    id: topic.id,
    position: i+1,
    name: topic.name,
    questions: []
  }

  let j = 0

  for (let question of topic.questions) {
    newTopic.questions.push({
      id: question.id,
      position: j+1,
      problem: question.problem,
      links: question.links
    })
    
    j++
  }

  out.push(newTopic)
  i++
}

fs.writeFileSync(
  OUT_PATH, 
  `export default ${JSON.stringify(out, null, 2)};\n\nexport const version = ${version+1};`
)

console.log("Final version created with version - ", version+1)