const express = require("express");
const routes = express.Router();
const Tutor = require("../models/tutor-db");
const bcrypt = require("bcryptjs");

// GET ALL REGISTERED TUTORS
routes.get("/tutor/result", async (req, res) => {
  try {
    const data = await Tutor.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ data });
  }
});

// FIND BY ID
routes.get("/tutor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataByid = await Tutor.findById(id);
    res.status(201).json(dataByid);
    console.log("Id took it");
    console.log(dataByid);
  } catch (error) {
    res.status(500).json({ error: error.response });
  }
});

// UPDATE REGISTERED TUTOR
routes.put("/tutor/:id", async (req, res) => {
  try {
    const saltRounds = 10;
    const id = req.params.id;
    const updateData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }
    const options = { new: true };
    const result = await Tutor.findByIdAndUpdate(id, updateData, options);

    res.status(201).json(result);
    console.log("id updated it");
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// DELETE REGISTERED TUTOR
routes.delete("/tutor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Tutor.findByIdAndDelete(id);
    res.status(201).json(result);
    console.log("id has been deleted it");
  } catch (error) {
    res.status(500).json({ error: error.response });
  }
});

module.exports = routes;
