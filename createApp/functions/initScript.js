const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function initializeProject(folderName) {
  const targetDirectory = folderName ? path.join(process.cwd(), folderName) : process.cwd();

  console.log(`⚒️\tInitializing npm project in ${targetDirectory}...`);
  // Initialize npm project
  execSync('npm init -y', { cwd: targetDirectory });
  console.log(`✔️\tProject Initilized`);

  console.log(`⚒️\tInstalling required packages in ${targetDirectory}...`);
  // Install required packages
  execSync('npm install --save express dotenv', { cwd: targetDirectory });
  console.log(`✔️\tPackages Installed`);

  console.log(`⚒️\tInstalling Dev Dependencies in ${targetDirectory}...`);
  // Install Dev Dependencies
  execSync('npm install --save-dev concurrently typescript ts-node nodemon @types/node @types/express', { cwd: targetDirectory });
  console.log(`✔️\tDev Dependencies Installed`);
  // Read the existing package.json
  const packageJsonPath = path.join(targetDirectory, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update scripts in package.json
  packageJson.scripts = {
    test: 'echo "Error: no test specified" && exit 1',
    start: 'node dist/index.js',
    dev: 'nodemon src/index.ts',
  };

  console.log(`⚒️\tUpdating scripts in ${packageJsonPath}...`);
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('✔️\tScripts updated');
}

// Export the function for external use
module.exports = initializeProject;


