# type-ex

This npm package assists in creating TypeScript-based Express.js applications with ease.

## Installation

To install the package globally, use the following command:

```bash
npm install -g type-ex
```

# Usage

### Creating an Express App
To create a new Express app with default settings:
```bash
npx type-ex createApp
```

### Customizing the App
You can customize the app by providing optional parameters:

```bash
npx assist createApp --name myApp --outDir ./myOutput --port 5000
```
- --name: Set the app name (optional).
- --outDir: Set the output directory (optional, default is "./dist").
- --port: Set the port number (optional, default is 4000).
### Nodemon Configuration
The package includes a nodemon.json file for automatic server restarts during development.

### TypeScript Configuration
The package generates a tsconfig.json file for TypeScript compilation.

### Environment Variables
A .env file is created for managing environmental variables. You can customize the port number in this file.
## Author
Dennis Mathew https://github.com/Dennis-Neduvelil

### License
This project is licensed under the MIT License - see the LICENSE file for details.

