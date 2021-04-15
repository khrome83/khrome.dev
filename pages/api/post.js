const logger = require("pino")();
const multiparty = require("multiparty");
let util = require("util");

export default function handler(req, res) {
  if (req.method === "POST") {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.write("received upload: \n\n");
      logger.info(util.inspect({ fields: fields, files: files }));
      res.end(util.inspect({ fields: fields, files: files }));
    });
    return;
  } else {
    logger.info("NOT POST");
    res.end("Send a POST request.");
    return;
  }
}
