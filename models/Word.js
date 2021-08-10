const { model, Schema } = require("mongoose");

const WordSchema = new Schema({
    jp: String,
    en: String,
    vn: String,
    romaji: String,
    pronunciation: String,
    description: String,
    src: String,
    examples: [
        {
            jp: String,
            vn: String,
        },
    ],
    comments: [
        {
            username: String,
            body: String,
            createdAt: String,
        },
    ],
});

// WordSchema.index({ jp: "text", en: "text", vn: "text", pronunciation: "text" });

module.exports = model("Word", WordSchema);
