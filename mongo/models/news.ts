import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  url: String,
  title: String,
  content: String,
  full_content: String,
  slug: String,
  thumbnail: String,
  date: Number,
  is_external: Boolean,
  readCount: {
    type: Number,
    default: 0,
  },
  categories: [String],
  source: {
    type: String,
    index: true,
  },
});

newsSchema.index({ id: 1 }, { unique: true });

newsSchema.post("findOne", function (doc) {
  if (doc) {
    doc.readCount += 1;
    doc.save();
  }
});

export default mongoose.models.News || mongoose.model("News", newsSchema);
