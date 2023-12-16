const fs = require('fs');

function createEnvFile(folderName, port) {
  const envFileName = folderName ? `${folderName}/.env` : '.env';
  const envFileContent = `# Add all of the environmental variables here instead of 
# embedding them directly in the app and utilize them 
# with the 'DotEnv' package.

PORT=${port || 4000}
`;

  if (!fs.existsSync(envFileName)) {
    fs.writeFileSync(envFileName, envFileContent);
    console.log(`✔️\tCreated ${envFileName} file.`);
  } else {
    console.error(`🥺\t${envFileName} file already exists.`);
  }
}

module.exports = { createEnvFile };
