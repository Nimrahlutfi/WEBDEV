const mongoose = require('mongoose');
const socialMediaLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const SocialMediaLink = mongoose.model('SocialMediaLink', socialMediaLinkSchema);

module.exports = SocialMediaLink;
