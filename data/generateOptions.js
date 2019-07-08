const path = require("path");
const fs = require("fs");

const patternsPath = path.join(__dirname, "patterns");
const illustrationsPath = path.join(__dirname, "illustrations");
const optionsPath = path.join(__dirname, "options.json");
const patterns = [];
const illustrations = [];

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

fs.writeFileSync(optionsPath, JSON.stringify({ patterns, illustrations }));
