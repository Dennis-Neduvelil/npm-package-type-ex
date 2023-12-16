#!/usr/bin/env node

const fs = require("fs");
const { createIndexFile } = require("./functions/createIndexFile");
const { createNodemonConfig } = require("./functions/createNodemonConfig");
const { createTsConfig } = require("./functions/createTsConfig");
const { createEnvFile } = require("./functions/createEnvFile");
const { createFolders } = require("./functions/createFolders");
const initializeProject = require("./functions/initScript");
const { isCamelCase } = require("../utils/validation");

function createApp(appName, outDir, port) {
  const rollback = [];

  function rollbackChanges() {
    console.log("Rolling back changes...");
    rollback.forEach((file) => {
      try {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
      } catch (err) {
        console.error(`Error deleting file: ${file}`, err);
      }
    });
  }

  function addRollback(file) {
    rollback.push(file);
  }

  try {
    createIndexFile(appName, addRollback);
    createNodemonConfig(appName, addRollback);
    createTsConfig(appName, outDir, addRollback);
    createEnvFile(appName, port, addRollback);

    console.log("✔️\tAll files created successfully.");
  } catch (error) {
    console.error("Error creating files:", error);
    rollbackChanges();
    process.exit(1);
  }
}

function printErrorCreateApp(errorMessage) {
  console.error(`Error: ${errorMessage}`);
  console.log(
    "Usage: npx type-ex createApp [--name <appName>] [--outDir <outputDirectory>] [--port <portNumber>]"
  );
  process.exit(1);
}

function createAppMain(args) {
  if (args[0] === "createApp" && !args[1].startsWith("--")) {
    printErrorCreateApp(
        "Invalid input."
      );
  }
  if (args[0] === "createApp" && args[1] !== "--help") {
    let nameIndex = args.indexOf("--name");
    let outDirIndex = args.indexOf("--outDir");
    let portIndex = args.indexOf("--port");

    const appName = nameIndex !== -1 ? args[nameIndex + 1] : ".";
    const outDir = outDirIndex !== -1 ? args[outDirIndex + 1] : "./dist";
    const port = portIndex !== -1 ? parseInt(args[portIndex + 1], 10) : 4000;

    if (nameIndex !== -1 && nameIndex + 1 >= args.length) {
      printErrorCreateApp("Missing app name after --name.");
    }

    if (outDirIndex !== -1 && outDirIndex + 1 >= args.length) {
      printErrorCreateApp("Missing output directory after --outDir.");
    }

    if (portIndex !== -1 && portIndex + 1 >= args.length) {
      printErrorCreateApp("Missing port number after --port.");
    }

    if (nameIndex !== -1 && !isCamelCase(appName)) {
      printErrorCreateApp(
        "Invalid app name. App name must be in camelCase format and start with a lowercase letter."
      );
    }

    // Check for the outDir only if it is provided
    if (outDirIndex !== -1 && !isCamelCase(outDir)) {
      printErrorCreateApp(
        "Invalid output directory. Output directory must be in camelCase format and start with a lowercase letter."
      );
    }

    if (isNaN(port) || port <= 0 || port > 65535) {
      printErrorCreateApp(
        "Invalid port number. Port must be a positive integer between 1 and 65535."
      );
    }
    createApp(appName, outDir, port);
    createFolders(appName);
    initializeProject(appName);

    console.log("\n\nHurrey 🎉🎉🎉 Project setup completed\n\n");
    console.log("We suggest you to begin by typing:")
    console.log(
      appName === "." ? "\nnpm run dev\n" : `\ncd ${appName}\nnpm run dev\n`
    );
  }
}

module.exports = { createAppMain };
