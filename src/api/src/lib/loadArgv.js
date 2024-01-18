const yargs = require("yargs");
const { isAscii } = require("buffer");
const { hideBin } = require("yargs/helpers");

const args = yargs(hideBin(process.argv)).argv;
process.argv = args;