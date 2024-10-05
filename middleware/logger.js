const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logs = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const log = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      log
    );
  } catch (e) {
    console.log(e);
  }
};

const logger = (req,res,next) =>{
    logs(`${req.method}\t${req.url}\t${req.headers.origin}`,"requests.log")
    next()
}

module.exports = {logger,logs}