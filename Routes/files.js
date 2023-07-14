const router = require("express").Router();
const { File } = require("../Models/File");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

let storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 50 } }).single('file'); //50 MB

router.post("/", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const newFile = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        })

        const response = await newFile.save();
        return res.status(200).json({ fileUrl: `${process.env.BASE_URL}/files/${response.uuid}` })
    })
})

router.get('/:uuid', async (req, res) => {
    // Extract link and get file from storage send download stream 
    const file = await File.findOne({ uuid: req.params.uuid });
    // Link expired
    if (!file) {
        return res.json({ message: "no file" });
    }
    const response = await file.save();
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
});



module.exports = router;