import mongoose from "mongoose"

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  bio: {
    type: String,
  },
  services:[{type: String}],
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Team = mongoose.model("Team", teamSchema)

export default Team