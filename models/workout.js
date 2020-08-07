const mongoose = require("mongoose");
// using mongoose to create Schema
const Schema = mongoose.Schema;
// Schema for  our workout info to be entered
const workoutSchema = new Schema(
    {
        day:{
            type: Date,
            default: () => new Date() 
        },
        exercises: [
            {
                type: {
                    // type will set as a String as stated
                    type: String, 
                    // trim set to true will eliminate whitespace and gaps in strings example " this " will = "this"
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
                },
                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes"
                },
                weight: {
                    type: Number,
                    required: "Enter a Weight"
                },
                reps: {
                    type: Number,
                    required: "Enter amount of reps"
                },
                sets: {
                    type: Number,
                    required: "Enter amount of Sets"
                },
                distance: {
                    type: Number,
                    required: "Enter Distance"
                }
            }
        ]
    },
    {
        // Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
        // The getters are useful for formatting or combining fields, while setters are useful for de-composing
        //  a single value into multiple values for storage. Setting to true displays it on the client side
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function () {
    // The reduce() method reduces the array to a single value.
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});
// To use our schema definition, we need to convert our Schema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;