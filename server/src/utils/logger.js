const chalk = require("chalk");
const dayjs = require("dayjs");

const log = (text) => {
  console.log(
    chalk.blue(dayjs().format("HH:mm:ss") + " =>"),
    chalk.green(text)
  );
};

const trace = (text) => {
  console.log(
    chalk.blue(dayjs().format("HH:mm:ss") + " =>"),
    chalk.yellowBright(text)
  );
};

const warn = (text) => {
  console.log(
    chalk.blue(dayjs().format("HH:mm:ss") + " =>"),
    chalk.orange(text)
  );
};

const logError = (text) => {
  console.log(chalk.blue(dayjs().format("HH:mm:ss") + " =>"), chalk.red(text));
};

module.exports = { log, trace, warn, logError };
