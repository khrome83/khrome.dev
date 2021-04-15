const logger = require("pino")();

export default function handler(req, res) {
  logger.info(req.body);
  res.status(200).json({ name: "John Doe" });
}
