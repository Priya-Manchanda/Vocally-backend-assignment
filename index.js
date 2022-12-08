const express = require("express");
var jwt = require("jsonwebtoken");
const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());
const books = require("./routes/booklist");
app.use("/book", books);
//  Mongodb connect
const mongoConnect = require("./db");
mongoConnect();
//  .env file
const dotenv = require("dotenv");
dotenv.config();
//  Rate limiter
const rateLimit = require("express-rate-limit");
// Swagger UI
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

//  Getting the token
app.get("/", (req, res) => {
  const token = jwt.sign({ data: "test" }, process.env.JWT_Secret);
  res.status(200).json({
    msg: "Hey, welcome to the vocally backend assginment!",
    api_docs: "/api-docs",
    token: token,
  });
});

// rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(port, () => console.log("Server is running"));
