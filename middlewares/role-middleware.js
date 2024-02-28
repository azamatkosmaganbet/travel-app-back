const jwt = require("jsonwebtoken");

// module.exports = function (roles) {
//   return function (req, res, next) {
//     if (req.method === "OPTIONS") {
//       next();
//     }

//     try {
//       console.log("====================================");
//       console.log(req.headers);
//       console.log("====================================");
//       const token = req.headers.authorization.split(" ")[1];
//       console.log(token);
//       if (!token) {
//         return res.status(403).json({ message: "У вас нету доступа" });
//       }
//       const { roles: userRoles } = jwt.verify(token, "jwt-secret-key");
//       let hasRole = false;
//       console.log(userRoles);
//       userRoles.forEach((role) => {
//         if (roles.includes(role)) {
//           hasRole = true;
//         }
//       });
//       if (!hasRole) {
//         return res.status(403).json({ message: "У вас нету доступа" });
//       }
//       next();
//     } catch (e) {
//       console.log(e);
//       return res.status(403).json({ message: "У вас нету доступа" });
//     }
//   };
// };

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }

      const userRole = jwt.verify(token, "jwt-secret-key").role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "У вас нет доступа" });
    }
  };
};
