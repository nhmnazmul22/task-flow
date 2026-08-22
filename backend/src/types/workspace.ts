import type {HydratedDocument, Schema} from "mongoose";

/**
 * Workspace types
 */
export interface WorkspaceType {
    tenant: string | typeof Schema.Types.ObjectId;
    name: string;
    slug: string;
    owner: string | typeof Schema.Types.ObjectId;
}

export type WorkspaceDocument = HydratedDocument<WorkspaceType>;

/**
 * Workspace Member types
 */

export enum WorkspaceMemberRoleEnum {
    OWNER = "owner",
    ADMIN = "admin",
    MEMBER = "member",
}

export interface WorkspaceMemberType {
    tenantId: string | typeof Schema.Types.ObjectId;
    workspaceId: string | typeof Schema.Types.ObjectId;
    userId: string | typeof Schema.Types.ObjectId;
    role: WorkspaceMemberRoleEnum;
}

export type WorkspaceMemberDocument = HydratedDocument<WorkspaceMemberType>;
