import { Request, Response } from "express";
import UserModel, { User } from "../models/user.js";

export async function listUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });

    if (!users) {
      throw new Error("No users found");
    }

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const user = await UserModel.findOne({ _id: userID });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  res.send("user updated");
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  res.send("user deleted");
}

export async function uploadDocument(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;
    const { front, back, type } = req.body;

    if (!type) {
      throw new Error("Document type is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    // Ensure the document type exists in the user's document structure
    if (!user.documents[type as keyof User["documents"]]) {
      user.documents[type as keyof User["documents"]] = [];
    }

    // Push new document entry
    (user.documents[type as keyof User["documents"]] as any).push({ front, back });

    await user.save();

    res.status(200).json({ message: "Document uploaded successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.error(`Error in uploadDocument: ${error.message}`);
  }
}

export async function uploadDocumentsAadhar(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { aadharCard } = req.body;

    if (!aadharCard) {
      throw new Error("Aadhar card is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.aadharCard) {
      throw new Error("Aadhar card already uploaded");
    }

    user.documents.aadharCard = aadharCard;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsDriving(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { drivingLicense } = req.body;

    if (!drivingLicense) {
      throw new Error("Driving license is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.drivingLicense) {
      throw new Error("Driving license already uploaded");
    }

    user.documents.drivingLicense = drivingLicense;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsPan(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { panCard } = req.body;

    if (!panCard) {
      throw new Error("Pan Card is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.panCard) {
      throw new Error("Pan Card already uploaded");
    }

    user.documents.panCard = panCard;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsRc(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { vehicleRC } = req.body;

    if (!vehicleRC) {
      throw new Error("Vehicle RC is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.vehicleRC) {
      throw new Error("Vehicle RC already uploaded");
    }

    user.documents.vehicleRC = vehicleRC;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsPermit(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { commercialPermit } = req.body;

    if (!commercialPermit) {
      throw new Error("Commercial Permit is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.commercialPermit) {
      throw new Error("Commercial Permit already uploaded");
    }

    user.documents.commercialPermit = commercialPermit;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsVoter(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { voterID } = req.body;

    if (!voterID) {
      throw new Error("Voter ID is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.voterID) {
      throw new Error("Voter ID already uploaded");
    }

    user.documents.voterID = voterID;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadDocumentsBusiness(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { businessRegistration } = req.body;

    if (!businessRegistration) {
      throw new Error("Business Registration is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.documents.businessRegistration) {
      throw new Error("Business Registration already uploaded");
    }

    user.documents.businessRegistration = businessRegistration;

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadUserPic(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const { profilePic } = req.body;

    if (!profilePic) {
      throw new Error("Profile Pic is required");
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    user.profilePic = profilePic;

    await user.save();

    if (!user) {
      throw new Error("User profile pic not updated");
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadVehicleDetails(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const {
      vehicleCategory,
      vehicleType,
      brand,
      model,
      modelYear,
      registrationNumber,
      pucNumber,
      pucValidUpto,
      isPermit,
    } = req.body;

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "driver") {
      throw new Error("Only drivers can upload vehicle details");
    }

    user.vehicle = {
      vehicleCategory,
      vehicleType,
      brand,
      model,
      modelYear,
      registrationNumber,
      pucNumber,
      pucValidUpto,
      isPermit,
    };

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }

    res
      .status(200)
      .json({ message: "Vehicle details uploaded successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function uploadProfessionalDetails(req: Request, res: Response): Promise<void> {
  try {
    const userID = req.params.id;

    const {
      businessShopAddress,
      totalExperienceYears,
      serviceFor } = req.body;

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "mechanic") {
      throw new Error("Only mechanic can upload professional details");
    }

    user.professional = {
      businessShopAddress,
      totalExperienceYears,
      serviceFor
    };

    await user.save();

    if (!user) {
      throw new Error("User not updated");
    }

    res
      .status(200)
      .json({ message: "Professional details uploaded successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}

export async function getUserDetails(req: Request, res: Response): Promise<void> {
  try {

    const userID = req.params.id;

    const user = await UserModel.findById(userID);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "driver") {
      res.status(200).json(user.vehicle);
    }

    if (user.role === "mechanic") {
      res.status(200).json(user.professional);
    }


  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signup: ${error.message}`);
  }
}