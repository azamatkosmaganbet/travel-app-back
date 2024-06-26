const Router = require("express").Router;
const userController = require("../controller/user-controller");
const guideController = require("../controller/guide-controller");
const tripController = require("../controller/trip-controller");
const routeController = require("../controller/route-controller");
const stopController = require("../controller/stop-controller");
const bookingController = require("../controller/booking-controller");
const reviewController = require("../controller/review-controller");
const cityController = require("../controller/city-controller");
const blogController = require("../controller/blog-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const roleMiddleware = require("../middlewares/role-middleware");
const messageController = require("../controller/message-controller")
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


const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/blog");
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload3 = multer({ storage: storage3 });

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
router.get("/guide/trip/:guideId", tripController.getTripsByGuideId);
router.get("/trip/:id", tripController.getTrip);
router.post("/create/trip", upload2.single("file"), tripController.createTrip);
router.post("/send-guide-request", guideController.sendGuideRequest);
router.post("/create/route", routeController.createRoute);
router.post("/create/stop", upload2.single("file"), stopController.createStop);
router.post("/create/booking", bookingController.createBooking);
router.post("/create/city", upload2.single("file"), cityController.createCity);
router.post("/create/review", reviewController.createReview);
router.get("/cities", cityController.getCities);
router.get("/review/:guideId", reviewController.getReviewsByUser);
router.get("/cities/:id", cityController.getCityWithGuides);
router.get("/booking/:userId", bookingController.getToursByUser);
router.get("/blogs", blogController.getAllPosts);
router.put(
  "/update/:userId",
  upload.single("file"),
  userController.updateAvatar
);
router.delete("/delete/blog/:postId", blogController.deletePost)
router.post("/create/blog", upload3.array("files", 10), blogController.createPost);
router.put(
  "/update/guide-status/:id",
  guideController.updateGuideRequestStatus
);
router.put(
  "/update/trip/:id",
  upload2.single("file"),
  tripController.updateTrip
);

router.post("/create/comment", blogController.createComment)
router.get("/comment/:postId", blogController.getCommentsByPost)
router.post("/like/:id", blogController.likePost)
router.post("/unlike", blogController.unlikePost)
router.get("/search", guideController.search)
router.get("/post/:userId", blogController.getPostsByUser)
// router.post('/send', messageController.sendMessage);
module.exports = router;
