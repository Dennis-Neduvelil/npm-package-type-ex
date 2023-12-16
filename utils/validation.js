function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}

module.exports = { isCamelCase };
