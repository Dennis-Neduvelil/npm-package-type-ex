const fs = require('fs');

function createTsConfig(folderName, outDir = './dist') {
  const tsConfigFileName = 'tsconfig.json';
  const tsConfigContent = `{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "${outDir}",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}`;

  const tsConfigPath = folderName ? `${folderName}/${tsConfigFileName}` : tsConfigFileName;

  if (!fs.existsSync(tsConfigPath)) {
    fs.writeFileSync(tsConfigPath, tsConfigContent);
    console.log(`✔️\tCreated ${tsConfigFileName} file.`);
  } else {
    console.error(`🥺\t${tsConfigFileName} file already exists.`);
  }
}

module.exports = { createTsConfig };

