module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies
  });
};
