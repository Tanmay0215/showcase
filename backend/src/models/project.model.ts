import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    image: string;
    url: string;
    githubUrl?: string;
    techStack?: string[];
    category?: string;
    isFeatured?: boolean;
    isApproved?: boolean;
    isRejected?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    {
        timestamps: true
    });

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project; 