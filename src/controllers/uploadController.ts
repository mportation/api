import { Request, Response } from "express";

export async function uploadFile1(req: Request, res: Response): Promise<void> {
    try {
        let file = req.file;
        if (!file) {
            throw new Error("No file uploaded");
        }

        file["filename"] = `${Date.now()}_${file.originalname}`;
        console.log("Uploaded file:", file);

        // Construct the file URL correctly
        const filePath = `${process.env.BASE_URL}/uploads/${file.filename}`;

        res.status(200).send({
            status: "success",
            path: filePath, // Corrected path format
        });

    } catch (error: any) {
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export async function uploadFile2(req: Request, res: Response): Promise<void> {
    try {
        if (!req.file) {
            throw new Error("No file uploaded");
        }

        res.status(200).json({
            success: true,
            message: "File uploaded successfully.",
            file: req.file
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};