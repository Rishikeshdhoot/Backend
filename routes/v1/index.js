const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
// const doctorsRoutes = require("./doctors");
const therapistRoutes = require("./therapist");
// const careSpRoutes = require("./careSp");
// const adminRoutes = require("./admin");
const outletRoutes = require("./outlets");
// const serviceProviderRoutes = require("./serviceProviers");

router.use("/api/v1/user/", userRoutes);
router.use("/api/v1/outlet/", outletRoutes);
// router.use("/api/v1/admin/", adminRoutes);
// router.use("/api/v1/doctor/", doctorsRoutes);
router.use("/api/v1/therapist/", therapistRoutes);
// router.use("/api/v1/careSp/", careSpRoutes);
// router.use("/api/v1/service-provider/", serviceProviderRoutes);

module.exports = router;
