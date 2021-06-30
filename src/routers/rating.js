const express = require("express");
const { Rating, Doctor } = require("../db/index");
const router = new express.Router();

router.post("/reviews/:id", function (req, res) {
  const rating = Rating.create(req.body)
    .then(function (rating) {
      return Doctor.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reviews: rating } },
        { new: true }
      );
    })
    .then(function (dbDoctor) {
      res.sendStatus(200).send(dbDoctor);
    })
    .catch(function (error) {
      res.sendStatus(400).send(error);
    });
});

router.get("/reviews/:id", function (req, res) {
  Doctor.findOne({ _id: req.params.id })
    .populate("reviews")
    .then(function (dbDoctor) {
      res.sendStatus(200).send(dbDoctor);
    })
    .catch(function (error) {
      res.sendStatus(200).send(error);
    });
});

module.exports = router;
