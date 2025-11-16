import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Please provide a project image URL']
    },
    techStack: {
      type: [String],
      required: [true, 'Please provide tech stack'],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: 'Tech stack must have at least one technology'
      }
    },
    githubUrl: {
      type: String,
      required: [true, 'Please provide GitHub URL']
    },
    liveUrl: String,
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Project', projectSchema);
