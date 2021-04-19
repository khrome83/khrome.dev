const logger = require("pino")();

export default function handler(req, res) {
  logger.info("Echo Back");
  res.json(req.body);
}
