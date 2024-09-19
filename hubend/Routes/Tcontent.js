const express = require('express');
const { body, validationResult } = require('express-validator');
const Content = require('../Hubmodels.js/Content');
const HubfetchTeacher = require('../middleware/HubfetchTeacher');
const router = express.Router();
const upload = require('../middleware/upload');
const Teacher = require('../Hubmodels.js/Teacher');
const Notifications = require('../Hubmodels.js/NotificationSchema');

//Route1: Posting content by teacher by using: POST /api/Tcontent ... Login required

router.post('/addMaterial', upload.single('material'), HubfetchTeacher, [
    body('title', 'Cannot be blank').exists(),
    body('description', 'Cannot be blank').exists(),
], async (req, res) => {
    try {
        let success = false;
        const { title, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ success, errors: errors.array() })
        }
        const teacher = await Teacher.findById(req.teacher.id);
        const teacherName = teacher.name;
        let materialData = null;
        let materialMimeType = null;
        if (req.file) {
            materialData = req.file.buffer;
            materialMimeType = req.file.mimetype
        }

        const contentIO = new Content({
            title, description,
            material: {
                data: materialData,
                contentType: materialMimeType
            },
            teacher: req.teacher.id,
            Teacher_name: teacherName
        })

        const notification = new Notifications({
            recipient: req.teacher.id,
            typeOf: 'newContent',
            content: contentIO._id,
            recipientName: teacherName,
            title: title,
        })

        const savedContent = await contentIO.save();
        const newNotification = await notification.save();
        res.status(200).send({ savedContent, newNotification });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Server Error', message: error.message })
    }
})

//Route 2: Deleting the uploaded content by teacher using: Delete /api/Tcontent... Login required

router.delete('/deleteMaterial/:id', HubfetchTeacher, async (req, res) => {
    try {
        let content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ error: "Material not found!!" });
        }
        if (content.teacher.toString() !== req.teacher.id) {
            return res.status(403).json({ error: "Not allowed" });
        }
        content = await Content.findByIdAndDelete(req.params.id);
        res.status(200).send({ "Success": "Note has been deleted", Deleted_content: content })
    } catch (error) {
        console.log(error.message);
        res.status(200).send({ error: "Internal server error", message: error.message })
    }
})

//Route 3: Update content by teacher: PUT /api/Tcontent ... Login required

router.put('/updateMaterial/:id', upload.single('material'), HubfetchTeacher, async (req, res) => {
    const { title, description } = req.body;
    try {
        let content = await Content.findById(req.params.id);
        if (!content) {
            res.send('Not found')
        }
        if (content.teacher.toString() != req.teacher.id) {
            res.send('Not allowed');
        }
        if (title) content.title = title;
        if (description) content.description = description;

        let materialData = null;
        let materialMimeType = null;

        if (req.file) {
            materialData = req.file.buffer;
            materialMimeType = req.file.mimetype;
            content.material = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        content = await content.save();
        res.status(200).send({ "Success": "updated Successfully", updated_content: content })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal server error', message: error.message });
    }
})

//Route 4: Get all content of required teacher by using: GET /api/Tcontent ... Login required

router.get('/getMaterial', HubfetchTeacher, async (req, res) => {
    let success = true;
    try {
        const material = await Content.find({ teacher: req.teacher.id }).select()
        res.status(200).send({ success, material })
    } catch (error) {
        success = false
        console.log(error.message);
        res.status(400).send({ success, error: 'Internal server error' })
    }
})

module.exports = router;