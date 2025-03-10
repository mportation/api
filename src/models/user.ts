import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface Documents extends Document {
  front: string;
  back: string;
}

const documentsSchema: Schema<Documents> = new Schema({
  front: {
    type: String,
  },
  back: {
    type: String,
  },

});

export interface User extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  mobile: number;
  gender: string;
  city: string;
  district: string;
  profilePic: string;
  role: "driver" | "mechanic"; // User role
  isVerified: boolean;
  documents: {
    aadharCard: Documents[];
    panCard: Documents[];
    drivingLicense: Documents[];
    vehicleRC: Documents[];
    commercialPermit: Documents[];
    voterID: Documents[];
    businessRegistration: Documents[];
  };
  vehicle: {
    vehicleCategory: string;
    vehicleType: string;
    brand: string;
    model: string;
    modelYear: number;
    registrationNumber: string;
    pucNumber: string;
    pucValidUpto: string;
    isPermit: string;
  };
  professional: {
    businessShopAddress: string;
    totalExperienceYears: number;
    serviceFor: string[];
  }
}

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+..+/, "Please use a valid email address"],
      lowercase: true,
    },
    mobile: {
      type: Number,
      minlength: 10,
      required: [true, "Phone number is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    city: String,
    district: String,
    profilePic: String,
    role: {
      type: String,
      enum: ["driver", "mechanic"],
      required: [true, "Role is required"],
    },
    isVerified: { type: Boolean, default: false },

    // Document Uploads
    documents: {
      aadharCard: [documentsSchema],
      panCard: [documentsSchema],
      drivingLicense: [documentsSchema],
      vehicleRC: [documentsSchema],
      commercialPermit: [documentsSchema],
      voterID: [documentsSchema],
      businessRegistration: [documentsSchema],
    },

    // Vehicle Details
    vehicle: {
      vehicleCategory: {
        type: String,
      },
      vehicleType: {
        type: String,
      },
      brand: {
        type: String,
      },
      model: {
        type: String,
      },
      modelYear: {
        type: Number,
      },
      registrationNumber: {
        type: String,
      },
      pucNumber: {
        type: String,
      },
      pucValidUpto: {
        type: String,
      },
      isPermit: {
        type: String,
      },
    },

    // Professional Details
    professional: {
      businessShopAddress: {
        type: String,
      },
      totalExperienceYears: {
        type: Number,
      },
      serviceFor: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
