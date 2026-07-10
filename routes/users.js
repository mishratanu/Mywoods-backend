const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers,
    getUser,
} = require("../controller/usercontroller");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;