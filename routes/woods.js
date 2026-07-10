const express=require("express");
const router= express.Router();
const{
    createWood,
    getWood,
    getWoods,
    updateWood,
    deleteWood,
} = require("../controller/woodcontroller");

// router.post("/",createWood);
// router.get("/",getWoods);
// router.get("/",getWood);
// router.put("/",updateWood);
// router.delete("/",deleteWood);

router.post("/", createWood);
router.get("/", getWoods);        // get all woods
router.get("/:id", getWood);     // get single wood
router.put("/:id", updateWood);
router.delete("/:id", deleteWood);

module.exports=router;