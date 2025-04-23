// route
const express = require("express");
const {
  contohquery,
  contohparam,
  contohbody,
} = require("../controllers/contoh");
const router = express.Router();

router.get("/query", contohquery);
router.get("/param/nama/:nama/umur/:umur", contohparam);
router.post("/body", contohbody);

module.exports = router;

// /api/v1/contoh/query
// /api/v1/contoh/param
// /api/v1/contoh/body
