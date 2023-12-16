const fs = require("fs");
const path = require("path");

function createFolders(appName) {
  const folders = [
    "routes",
    "controllers",
    "services",
    "repositorys",
    "models",
    "middlewares",
    "utils",
    "types",
    "enums",
    "validators",
    "hooks",
  ];

  const rootDir = path.join(appName, "src");

  try {
    // Create folders and index.ts files inside each folder
    folders.forEach((folder) => {
      const folderPath = path.join(rootDir, folder);

      // Create the folder
      fs.mkdirSync(folderPath);
      console.log(`✔️\tCreated folder: ${folderPath}`);

      // Create index.ts file
      const indexPath = path.join(folderPath, "index.ts");
      fs.writeFileSync(indexPath, `// ${folder} index.ts\n`);
      console.log(`✔️\tCreated ${folder} index.ts file: ${indexPath}`);
    });

    console.log("✔️\tFolder structure created successfully.");
  } catch (error) {
    console.error("🥺\tError creating folders");
  }
}

module.exports = { createFolders };
