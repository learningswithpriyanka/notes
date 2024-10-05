const express = require("express");
const router = express.Router();
const {getAllUsers,createNewUser} = require("../controllers/user");

router.route("/")
.get(getAllUsers)
.post(createNewUser)
.patch()
.delete()

module.exports = router;