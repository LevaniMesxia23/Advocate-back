import mongoose from "mongoose"

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link1: {
    type: String,
  },
  link2: {
    type: String,
  },
}, { timestamps: true })

const Carousel = mongoose.model('Carousel', carouselSchema)

export default Carousel