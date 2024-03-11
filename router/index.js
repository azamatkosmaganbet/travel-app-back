const Router = require("express").Router;
const userController = require("../controller/user-controller");
const guideController = require("../controller/guide-controller");
const tripController = require("../controller/trip-controller");
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

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/trips");
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload2 = multer({ storage: storage2 });

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
router.get("/users", userController.getUsers);
router.get("/users/:role", userController.getUsersByRole);
router.get("/pending-guide-requests", guideController.getPendingGuideRequests);
router.get("/guides", guideController.getGuides);
router.get("/guide/:id", guideController.getGuideById);
router.get("/guide/trip/:guideId", tripController.getTripsByGuideId )
router.post("/create/trip", upload2.single("file"), tripController.createTrip);
router.post("/send-guide-request", guideController.sendGuideRequest);

router.put(
  "/update/:userId",
  upload.single("file"),
  userController.updateAvatar
);
module.exports = router;
