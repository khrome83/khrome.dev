const logger = require("pino")();
const Busboy = require("busboy");

export default function handler(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  const obj = {};

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    logger.error("File [" + fieldname + "]: filename: " + filename);

    file.on("data", function (data) {
      logger.error("File [" + fieldname + "] got " + data.length + " bytes");
    });

    file.on("end", function () {
      logger.error("File [" + fieldname + "] Finished");
    });
  });

  busboy.on(
    "field",
    function (fieldname, val, fieldnameTruncated, valTruncated) {
      logger.error("Field [" + fieldname + "]: value: " + val);
      obj[fieldname] = val;
    }
  );

  busboy.on("finish", function () {
    logger.error("Done parsing form!");
    logger.error(obj);
    res.json(obj);
  });

  logger.error("Starting Parsing");
  logger.error("Body", req.body);
  return req.pipe(busboy);
}
