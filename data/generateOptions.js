const path = require("path");
const fs = require("fs");

const patternsPath = path.join(__dirname, "../image/src/patterns");
const illustrationsPath = path.join(__dirname, "../image/src/illustrations");
const themesPath = path.join(__dirname, "../image/src/themes");
const stylesPath = path.join(__dirname, "../image/src/styles");
const optionsPath = path.join(__dirname, "options.json");
const patterns = [];
const illustrations = [];
const themes = [];
const styles = [];

try {
  const patternsFiles = fs.readdirSync(patternsPath);
  patternsFiles.forEach(file => {
    const fileName = file.split(".svg")[0];
    if (fileName.charAt(0) !== ".") {
      patterns.push(fileName);
    }
  });
} catch (e) {
  return console.log("Unable to scan directory: " + err);
}

try {
  const illustrationsFiles = fs.readdirSync(illustrationsPath);
  illustrationsFiles.forEach(file => {
    const fileName = file.split(".svg")[0];
    if (fileName.charAt(0) !== ".") {
      illustrations.push(fileName);
    }
  });
} catch (e) {
  return console.log("Unable to scan directory: " + err);
}

try {
  const themesFiles = fs.readdirSync(themesPath);
  themesFiles.forEach(file => {
    const fileName = file.split(".css")[0];
    if (fileName.charAt(0) !== ".") {
      themes.push(fileName);
    }
  });
} catch (e) {
  return console.log("Unable to scan directory: " + err);
}

try {
  const stylesFiles = fs.readdirSync(stylesPath);
  stylesFiles.forEach(file => {
    const fileName = file.split(".css")[0];
    if (fileName.charAt(0) !== ".") {
      styles.push(fileName);
    }
  });
} catch (e) {
  return console.log("Unable to scan directory: " + err);
}

fs.writeFileSync(
  optionsPath,
  JSON.stringify({ patterns, illustrations, themes, styles })
);
