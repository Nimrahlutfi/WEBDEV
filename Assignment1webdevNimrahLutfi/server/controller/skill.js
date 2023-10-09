const Skill = require('../model/skillSchema.js');

// Create a new skill
const createSkill = async (req, res) => {
    const { name, level } = req.body;
    const newSkill = new Skill({ name, level });

    try {
        await newSkill.save();
        res.status(201).json({ message: 'Skill saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving skill' });
    }
};


// Fetch all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching skills' });
    }
};


// Update a skill by ID
const updateSkill = async (req, res) => {
    const skillId = req.params.id; // Assuming you have a route parameter for skill ID
    const { name, level } = req.body;

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(
            skillId,
            { name, level },
            { new: true }
        );

        if (updatedSkill) {
            res.status(200).json(updatedSkill);
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating skill' });
    }
};

// Delete a skill by ID
const deleteSkill = async (req, res) => {
    const skillId = req.params.id; // Assuming you have a route parameter for skill ID

    try {
        const deletedSkill = await Skill.findByIdAndDelete(skillId);

        if (deletedSkill) {
            res.status(200).json({ message: 'Skill deleted successfully' });
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting skill' });
    }
};


module.exports = { createSkill, getAllSkills, updateSkill,deleteSkill };