const router = require("express").Router();
const Merchant = require("../models/Merchant");

router.post("/onboard", async (req, res) => {
  const merchant = await Merchant.create({
    ...req.body,
    verified: false
  });
  res.json(merchant);
});

router.get("/:id", async (req, res) => {
  const merchant = await Merchant.findById(req.params.id);
  res.json(merchant);
});

module.exports = router;
