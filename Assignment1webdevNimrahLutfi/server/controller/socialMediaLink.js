const SocialMediaLink= require('../model/socialMediaLinkSchema.js');

// Create a new Platfprm
const createPlatform = async (req, res) => {
    const { platform, url } = req.body;
    const newPlatform = new SocialMediaLink({ platform, url });

    try {
        await newPlatform.save();
        res.status(201).json({ message: 'Platform saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving Platform' });
    }
};


// Fetch all Platforms
const getAllPlatforms = async (req, res) => {
    try {
        const platforms = await SocialMediaLink.find({});
        res.status(200).json(platforms);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching skills' });
    }
};


// Update a Platform by ID
const updatePlatform = async (req, res) => {
    const platformId = req.params.id; // Assuming you have a route parameter for skill ID
    const { platform, url } = req.body;

    try {
        const updatedPlatform = await SocialMediaLink.findByIdAndUpdate(
            platformId,
            {platform, url },
            { new: true }
        );

        if (updatedPlatform) {
            res.status(200).json(updatedPlatform);
        } else {
            res.status(404).json({ error: 'platform not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating platform' });
    }
};

// Delete a platform by ID
const deletePlatform = async (req, res) => {
    const platformId = req.params.id; // Assuming you have a route parameter for skill ID

    try {
        const deletedPlatform = await SocialMediaLink.findByIdAndDelete(platformId);

        if (deletedPlatform) {
            res.status(200).json({ message: 'Platform deleted successfully' });
        } else {
            res.status(404).json({ error: 'Platform not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting Platform' });
    }
};


module.exports = { createPlatform, getAllPlatforms, updatePlatform, deletePlatform};