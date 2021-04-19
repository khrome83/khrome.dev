const logger = require("pino")();

export default function handler(req, res) {
  logger.info("Echo Back");
  return req.json(req.body);
}
