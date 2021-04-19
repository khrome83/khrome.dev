const logger = require("pino")();

export default function handler(req, res) {
  logger.info("Echo Back");
  logger.info(req.body);
  res.json(req.body);
}
