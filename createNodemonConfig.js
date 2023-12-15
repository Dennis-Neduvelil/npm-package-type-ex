const fs = require('fs');

function createNodemonConfig(folderName) {
  const nodemonFileName = 'nodemon.json';
  const nodemonFileContent = `{
  "watch": ["${folderName}/src"],
  "ext": "ts",
  "exec": "concurrently \\"npx tsc --watch\\" \\"npx ts-node ${folderName}/src/index.ts\\""
}`;

  const nodemonPath = folderName ? `${folderName}/${nodemonFileName}` : nodemonFileName;

  if (!fs.existsSync(nodemonPath)) {
    fs.writeFileSync(nodemonPath, nodemonFileContent);
    console.log(`✔️\tCreated ${nodemonFileName} file.`);
  } else {
    console.error(`🥺\t${nodemonFileName} file already exists.`);
  }
}

module.exports = { createNodemonConfig };


