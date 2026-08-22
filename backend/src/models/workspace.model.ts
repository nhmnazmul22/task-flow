import type {WorkspaceType} from "@/types/workspace.js";
import mongoose, {Model, Schema} from "mongoose";

const WorkspaceSchema = new Schema<WorkspaceType>(
    {
        tenant: {
            type: Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

WorkspaceSchema.index({tenant: 1, slug: 1}, {unique: true});

WorkspaceSchema.pre('find', function () {
    this.populate('tenant', 'name')
    this.populate('owner', 'fullName email role')
});

WorkspaceSchema.pre('findOne', function () {
    this.populate('tenant', 'name')
    this.populate('owner', 'fullName email role')
});


const WorkspaceModel: Model<WorkspaceType> =
    mongoose.models.Workspace ??
    mongoose.model<WorkspaceType>("Workspace", WorkspaceSchema);

export default WorkspaceModel;
