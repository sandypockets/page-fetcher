// This program takes CLI arguments.
// node fetcher.js <Page URL to save> <Where it should be saved>
// Example: node fetcher.js http://example.com ./index.html

const request = require('request');
const fs = require('fs');
const chalk = require('chalk');
let args = process.argv.slice(2);

const parseUserReq = () => {
  let userURL = args[0];
  let userSavePath = args[1];
  console.log(userURL, userSavePath);
  downloadPage(userURL, userSavePath);
};

const downloadPage = (requestURL, userSavePath) => {
  request(requestURL, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    writeFiles(userSavePath, body);
  });
};

const writeFiles = (userSavePath, dataBody) => {
  fs.writeFile(userSavePath, dataBody, 'utf8', (err) => {
    if (err) throw err;
    console.log(chalk.bgGreen('The file has been saved!'));
    getFileSize(userSavePath);
  });
};

const getFileSize = (userSavePath) => {
  fs.stat(userSavePath, (err, stats) => {
    if (err) throw err;
    //let sizeInBytes = fileStats.size;
    //console.log(chalk.green(sizeInBytes));
    console.log(chalk.green(`Downloaded and saved ${stats.size} bytes to ${userSavePath}.`));
  });
};

parseUserReq(args);