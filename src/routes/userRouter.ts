import { Router } from "express";
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadDocument,
  uploadDocumentsAadhar,
  uploadDocumentsDriving,
  uploadDocumentsPan,
  uploadDocumentsRc,
  uploadDocumentsPermit,
  uploadDocumentsVoter,
  uploadDocumentsBusiness,
  uploadVehicleDetails,
  uploadProfessionalDetails,
  getUserDetails,
  uploadUserPic,
} from "../controllers/userController.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.put("/documents/:id", uploadDocument);
router.put("/documents/aadhar/:id", uploadDocumentsAadhar);
router.put("/documents/driving/:id", uploadDocumentsDriving);
router.put("/documents/pan/:id", uploadDocumentsPan);
router.put("/documents/rc/:id", uploadDocumentsRc);
router.put("/documents/permit/:id", uploadDocumentsPermit);
router.put("/documents/voter/:id", uploadDocumentsVoter);
router.put("/documents/business/:id", uploadDocumentsBusiness);

router.put("/vehicle/:id", uploadVehicleDetails);
router.put("/professional/:id", uploadProfessionalDetails);
router.get("/details/:id", getUserDetails);

router.put("/profile-pic/:id", uploadUserPic);

export default router;
