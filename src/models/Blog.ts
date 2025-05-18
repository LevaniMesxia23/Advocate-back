import mongoose from 'mongoose'
import slugify from 'slugify'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  images: [{ type: String }],
  socialLinks: [{ type: String }],
  content: {
    type: String,
    required: true,
  },
  lawWays:{
    type:String,
    required:true
  },
}, {timestamps:true})

blogSchema.pre('save', function(next){
  if(!this.slug){
    this.slug = slugify(this.title, {lower:true, strict:true})
  }
  next()
})

blogSchema.index({ title: 'text', content: 'text' })
blogSchema.index({slug: 1})
blogSchema.index({category: 1})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
