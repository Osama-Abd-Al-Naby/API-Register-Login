const router = require("express").Router();

const { getprofileuser } = require("../Controller/getprofile");
const { loginCtrl } = require("../Controller/loginCtrl");
const { registerCtrl } = require("../Controller/registerCtrl");
const auth = require("../Controller/verifyToken");

router.post("/register", registerCtrl);

router.post("/login", loginCtrl);

router.get("/profile", auth, getprofileuser);

module.exports = router;
