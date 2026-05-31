import {
    Schema,
    model,
    Types,
    InferSchemaType,
    HydratedDocument,
} from "mongoose";

const documentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        originalName: {
            type: String,
            required: true,
            trim: true,
        },

        fileName: {
            type: String,
            required: true,
            unique: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        mimeType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type IDocument =
    InferSchemaType<typeof documentSchema>;

export type IDocumentDocument =
    HydratedDocument<IDocument>;

export const DocumentModel = model<IDocument>(
    "Document",
    documentSchema
);