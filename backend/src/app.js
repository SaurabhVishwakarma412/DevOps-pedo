// // backend/app.js
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const app = express();


// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://pedo-derma.vercel.app"
//   ],
//   credentials: true
// }));

// app.use(express.json());

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // Routes
// app.use("/api/patients", require("./routes/authRoutes"));
// app.use("/api/cases", require("./routes/caseRoutes"));
// app.use("/api/doctors", require("./routes/doctorRoute"));
// app.use("/api/messages", require("./routes/messageRoutes"));

// module.exports = app;


const express = require("express");
const cors = require("cors");
const path = require("path");
const client = require("prom-client");

const app = express();

/* PROMETHEUS */
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests"
});

app.use((req, res, next) => {
  httpRequests.inc();
  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
/* END PROMETHEUS */

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pedo-derma.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/patients", require("./routes/authRoutes"));
app.use("/api/cases", require("./routes/caseRoutes"));
app.use("/api/doctors", require("./routes/doctorRoute"));
app.use("/api/messages", require("./routes/messageRoutes"));

module.exports = app;