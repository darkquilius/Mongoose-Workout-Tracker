const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(dbWorkouts => res.json(dbWorkouts))
        .catch(err => {
            res.status(400).json(err)
        });
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkouts =>
            res.json(dbWorkouts))
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findById(req.params.id)
        .then(workout => {
            let workoutExercises = workout.exercises;
            workoutExercises.push(req.body);
            Workout.findByIdAndUpdate(
                req.params.id,
                workout,
                (err, update) => {
                    if (err) res.json(err);
                    else res.json(update);
                }
            );
            console.log(workout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find()
        .then(workoutStats => res.json(workoutStats))
        .catch(err => {
            res.status(400).json(err)
        });
})

module.exports = router