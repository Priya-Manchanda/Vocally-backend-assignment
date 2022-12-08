var jwt = require("jsonwebtoken");
const fetchBook = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_Secret);

    req.book = data.book;
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  next();
};
module.exports = fetchBook;
