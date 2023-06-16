const fs = require('fs');

const coverageDataPath = 'coverage/coverage-final.json';
const readmeFilePath = 'README.md';

// Read the coverage data from the JSON file
const coverageData = JSON.parse(fs.readFileSync(coverageDataPath, 'utf8'));

// Calculate the coverage percentage
const calculateCoveragePercentage = (data) => {
  let totalStatements = 0;
  let coveredStatements = 0;

  for (const filePath in data) {
    const fileData = data[filePath];
    const { statementMap, s } = fileData;

    const coveredStatementCount = Object.values(s).reduce((acc, val) => acc + (val > 0 ? 1 : 0), 0);
    const totalStatementCount = Object.keys(statementMap).length;

    coveredStatements += coveredStatementCount;
    totalStatements += totalStatementCount;
  }

  return ((coveredStatements / totalStatements) * 100).toFixed(2);
};

// Get the coverage percentage
const coveragePercentage = calculateCoveragePercentage(coverageData);

// Read the README file
let readmeContent = fs.readFileSync(readmeFilePath, 'utf8');

// Update the coverage percentage in the README content
readmeContent = readmeContent.replace(
  /\[\d+\.\d+%]/, // Regular expression to match the coverage percentage within square brackets
  `[${coveragePercentage}%]`
);

// Write the updated content back to the README file
fs.writeFileSync(readmeFilePath, readmeContent, 'utf8');

console.log('README file updated with the coverage percentage.');
