const router = require("express").Router();
const Experience = require("../models/Experience");

router.get("/", async (req, res) => {
    const { category, duration } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (duration) filter.duration = { $lte: duration };

    const data = await Experience.find(filter).limit(5);
    res.json(data);
});

router.get("/:id", async (req, res) => {
    const exp = await Experience.findById(req.params.id);
    res.json(exp);
});

module.exports = router;
