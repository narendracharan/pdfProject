const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeControlles");

router.get("/home", homeController.homeView);
router.get("/download", homeController.generatePDF);

module.exports = router;
