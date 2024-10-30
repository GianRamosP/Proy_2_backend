const ExerciseRoutine = require("../models/ExerciseRoutine");

const addExerciseRoutine = async (req, res) => {
  const { user, exerciseName, description } = req.body;

  try {
    const routine = new ExerciseRoutine({ user, exerciseName, description });
    await routine.save();
    res.status(201).json(routine);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la rutina de ejercicio",
      error: error.message,
    });
  }
};

// const getUserExerciseRoutines = async (req, res) => {
//   try {
//     const routines = await ExerciseRoutine.find({ user: req.params.userId });
//     res.status(200).json(routines);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al obtener las rutinas de ejercicio",
//       error: error.message,
//     });
//   }
// };

const getUserExerciseRoutines = async (req, res) => {
  const { userId } = req.params; // Asegúrate de que userId esté en los params
  try {
    const routines = await ExerciseRoutine.find({ user: userId }); //
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines", error });
  }
};

const getAllExerciseRoutines = async (req, res) => {
  try {
    const routines = await ExerciseRoutine.find();
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las rutinas de ejercicio",
      error: error.message,
    });
  }
};

module.exports = {
  addExerciseRoutine,
  getUserExerciseRoutines,
  getAllExerciseRoutines,
};
