// help.js

const commander = require('commander');
const pkg = require('./package.json');

function setupCommander() {
  commander
    .version(pkg.version)
    .name('npx type-ex')
    .command('createApp')
    .option('--name <appName>', 'Set the app name')
    .option('--outDir <outputDirectory>', 'Set the output directory')
    .option('--port <portNumber>', 'Set the port number')
    .on('--help', () => {
      console.log('\nExamples:');
      console.log('  npx type-ex createApp --name myApp --outDir ./myOutput --port 5000');
    });

  commander.parse(process.argv);

  // If no command is provided
  if (!process.argv.slice(2).length) {
    commander.outputHelp();
  }
}

// Only run setupCommander when executed directly
if (require.main === module) {
  setupCommander();
}

module.exports = { setupCommander };
