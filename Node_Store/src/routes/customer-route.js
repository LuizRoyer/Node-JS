"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");
const authService = require('../services/auth-Service');

router.get("/", controller.get);
router.post("/", authService.authorize, controller.post);
router.put("/:id",authService.authorize,  controller.put);
router.delete("/:id",authService.authorize, controller.delete);
router.post("/authenticate", controller.authenticate);

module.exports = router;
