#!/usr/bin/env node

const fs = require('fs');

function createIndexFile(folderName) {
  const srcFolderName = folderName ? `${folderName}/src` : 'src';
  const fileName = 'index.ts';
  const fileContent = `import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(\`[server]: Server is running at http://localhost:\${port}\`);
});`;

  if (!fs.existsSync(srcFolderName)) {
    fs.mkdirSync(srcFolderName, { recursive: true });
    console.log(`Created ${srcFolderName} folder.`);
  } else {
    console.error(`${srcFolderName} folder already exists.`);
    return;
  }

  const filePath = `${srcFolderName}/${fileName}`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, fileContent);
    console.log(`✔️\tCreated ${fileName} file in ${srcFolderName} folder.`);
  } else {
    console.error(`🥺\t${fileName} file already exists in ${srcFolderName} folder.`);
  }
}

module.exports = { createIndexFile };
