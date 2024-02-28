const Router = require("express").Router;
const userController = require("../controller/user-controller");
const guideController = require("../controller/guide-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const roleMiddleware = require("../middlewares/role-middleware");
const { body } = require("express-validator");
const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/users/:role", userController.getUsersByRole);
router.get(
  "/pending-guide-requests",
  roleMiddleware(["tourist"]),
  guideController.getPendingGuideRequests
);

router.post("/send-guide-request", guideController.sendGuideRequest);

router.put(
  "/update/:userId",
  upload.single("file"),
  userController.updateAvatar
);
module.exports = router;
