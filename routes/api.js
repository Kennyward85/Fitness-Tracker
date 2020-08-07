const router = require("express").Router();
const Workout = require("../models/workout");
// this will post the workout to the server database
router.post("/api/workouts", (req,res) => {
    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});
// this will find the workout by ID and update 

router.put("/api/workouts/:id", ({body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        // pushing id it to exercises
        { $push: { exercises: body } },
        // New being true will return the updated information rather than the original
        // runValidators if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
        { new: true, runValidators: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});
// This will find the workouts done with a limit of 7 
// then will apply the json response to the stats.html page 
router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});
// gets the original posted information and returns it into the last workout section
router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});


module.exports = router;