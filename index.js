import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from 'cors';
import UserRoutes from "./Kambaz/Users/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/router.js";
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/route.js';
import AssignmentRoutes from './Kambaz/Assignment/route.js';
import session from "express-session";
import "dotenv/config";

const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       process.env.NETLIFY_URL, 
//       "http://localhost:5173",
//       "http://localhost:4000",
//       "https://kanbas-react-web-app-candice.netlify.app"
//     ]
//   })
// );
const corsOptions =
  process.env.NODE_ENV === "development"
    ? {
        origin: true,
        credentials: true,
      }
    : {
        origin: [
          process.env.NETLIFY_URL,
          "https://kanbas-react-web-app-candice.netlify.app",
        ],
        credentials: true,
      };

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
// };
// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.NODE_SERVER_DOMAIN,
//   };
// }
// app.use(session(sessionOptions));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true,
  },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
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
Hello(app)
app.listen(process.env.PORT || 4000);
