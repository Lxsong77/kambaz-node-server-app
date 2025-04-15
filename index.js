import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js";
import cors from 'cors';
import Lab5 from "./Lab5/index.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import session from "express-session";
import UserRoutes from "./Kambaz/Users/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/router.js";
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/route.js';
import AssignmentRoutes from './Kambaz/Assignment/route.js';
import "dotenv/config";

const CONNECTION_STRING = 
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173"

  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV != "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));


function debugMiddleware(req, res, next) {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  next();
}

app.use(express.json());
app.use(debugMiddleware)
UserRoutes(app);
EnrollmentsRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);   
Lab5(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
Hello(app);
app.listen(process.env.PORT || 4000);
