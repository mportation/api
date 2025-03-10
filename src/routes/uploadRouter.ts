import multer from "multer";
import { Router } from "express";
import { uploadFile1 } from "../controllers/uploadController.js";

const router = Router();
const upload = multer({ dest: 'uploads/' })

router.post("/file", upload.single("file"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    res.status(200).send({
        status: "success",
    });
});

router.post("/upload", upload.single("file"), uploadFile1);


export default router;
