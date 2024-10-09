const Routine = require("../models/Routine");

exports.createRoutine = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const newRoutine = new Routine({ name, exercises });
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find();
    res.status(200).json(routines);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRoutine = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const routine = await Routine.findByIdAndUpdate(
      req.params.id,
      { name, exercises },
      { new: true }
    );
    res.status(200).json(routine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRoutine = async (req, res) => {
  try {
    await Routine.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Routine deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
