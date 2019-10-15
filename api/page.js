module.exports = (req, res) => {
  const { token, path, domain: partialDomain } = req.query;
  const domain = `/${partialDomain}`;

  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ domain, token, path });
};
