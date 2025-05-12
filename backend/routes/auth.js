// import express from "express";
// import { Admin } from "../models/Admin.js";
// import { Student } from "../models/Student.js";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs';


// const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { username, password, role } = req.body;
//   // console.log(role)

//   try {
//     if (role === "admin") {
//       // console.log(username)
//       const admin = await Admin.findOne({ username });
//       if (!admin) {
//         return res.json({ message: "Admin not found" });
//       }
//       const validPassword = await bcrypt.compare(password, admin.password);
//       if (!validPassword) {
//         return res.json({ message: "Invalid Password for admin" });
//       }
//       const token = jwt.sign(
//         { username: admin.username, role: "admin" },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );
//       res.cookie("token", token, { httpOnly: true, secure: true });

//       return res.json({ login: true, role: "admin", token: token });
//     } else if (role === "student") {
//       const student = await Student.findOne({ username });
//       if (!student) {
//         return res.json({ message: "Student not found" });
//       }
//       const validPassword = await bcrypt.compare(password, student.password);
//       if (!validPassword) {
//         return res.json({ message: "Invalid Password" });
//       }
//       const token = jwt.sign(
//         { username: student.username, role: "student" },
//         process.env.STUDENT_JWT_SECRET,
//         { expiresIn: "1h" }
//       );
//       res.cookie("token", token, { httpOnly: true, secure: true });

//       return res.json({ login: true, role: "student", token: token });
//     } else {
//     }
//   } catch (er) {
//     res.json(er);
//   }
// });
// const verifyAdmin = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ message: "Invalid Admin" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.json({ message: "Invalid Admin" });
//       } else {
//         req.username = decoded.username;
//         req.role = decoded.role;
//         next();
//       }
//     });
//   }
// };

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ message: "Invalid User" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         jwt.verify(token, process.env.STUDENT_JWT_SECRET, (err, decoded) => {
//           if (err) {
//             return res.json({ message: "Invalid token" });
//           } else {
//             req.username = decoded.username;
//             req.role = decoded.role;
//             next();
//           }
//         });
//       } else {
//         req.username = decoded.username;
//         req.role = decoded.role;
//         next();
//       }
//     });
//   }
// };
// router.get("/verify", verifyUser, (req, res) => {
//   return res.json({ login: true, role: req.role });
// });
// router.get("/logout", (req, res) => {
//   res.clearCookie("token"); // Clear the cookie
//   res.json({ logout: true }); // Send a response to the client
// });

// export { router as AdminRouter, verifyAdmin };
import express from "express";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/Student.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "Admin not found" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ message: "Invalid Password for admin" });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return res.json({ login: true, role: "admin", token: token });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "Student not found" });
      }

      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ message: "Invalid Password" });
      }

      // Check if student is verified by the admin
      if (!student.verified) {
        return res.json({ login: false, message: "Your account is not verified by the admin. Please contact the admin." });
      }

      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.STUDENT_JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return res.json({ login: true, role: "student", token: token });
    } else {
      return res.json({ message: "Invalid role" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Admin" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is missing or invalid" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.STUDENT_JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token for both admin and student" });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  res.json({ logout: true }); // Send a response to the client
});

export { router as AdminRouter, verifyAdmin };
