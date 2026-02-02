const router = require("express").Router();
const Booking = require("../models/Booking");
const { generateToken } = require("../utils/token");

router.post("/", async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    bookingToken: generateToken(),
    paymentStatus: "paid"
  });
  res.json(booking);
});

router.post("/:id/confirm", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "confirmed" });
  res.json({ message: "Booking confirmed" });
});

module.exports = router;
