const logger = require("pino")();
const Busboy = require("busboy");

export default function handler(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  const obj = {};

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    logger.info("File [" + fieldname + "]: filename: " + filename);

    file.on("data", function (data) {
      logger.info("File [" + fieldname + "] got " + data.length + " bytes");
    });

    file.on("end", function () {
      logger.info("File [" + fieldname + "] Finished");
    });
  });

  busboy.on(
    "field",
    function (fieldname, val, fieldnameTruncated, valTruncated) {
      logger.info("Field [" + fieldname + "]: value: " + val);
      obj[fieldname] = val;
    }
  );

  busboy.on("finish", function () {
    logger.info("Done parsing form!");
    logger.info(obj);
    res.json(obj);
  });

  req.pipe(busboy);
}
