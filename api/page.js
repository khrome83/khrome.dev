module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { token, path, domain: parialDomain } = req.query;
  const domain = `/${partialDomain}`;

  res.json({ domain, token, path });
};
