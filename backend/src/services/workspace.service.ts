import {generateSlug} from "@/utils/common.js";
import type {Request} from "express";
import mongoose from "mongoose";
import * as WorkspaceRepo from "@/repositories/workspace.repo.js";
import {createWorkspaceMember} from "@/repositories/workspace-member.repo.js";
import {WorkspaceMemberRoleEnum} from "@/types/workspace.js";
import {AppError} from "@/errors/appError.js";
import type {updateWorkspacePayloadType} from "@/validations/workspace.validation.js";
import ResponseStatus from "@/config/status.js";

export const createWorkspace = async (req: Request) => {
    const session = await mongoose.startSession();

    const payload = req.body;
    const data = {
        name: payload.name,
        slug: payload.slug ?? generateSlug(payload.name),
        tenantId: req.authInfo?.tenantId as string,
        ownerId: req.authInfo?.userId as string,
    };

    // Create the workspace
    const workspace = await WorkspaceRepo.createWorkspace(data, session);

    if (!workspace) {
        throw new AppError(500, "Workspace create failed");
    }

    // add the member into the workspace
    await createWorkspaceMember(
        {
            tenantId: workspace.tenantId,
            userId: workspace.ownerId,
            workspaceId: workspace._id.toString(),
            role: WorkspaceMemberRoleEnum.OWNER,
        },
        session,
    );

    return workspace;
};

export const updateWorkspace = async (workspaceId: string, payload: updateWorkspacePayloadType) => {
    if (!workspaceId) {
        throw new AppError(ResponseStatus.NOT_FOUND, 'Workspace id not found.')
    }

    return await WorkspaceRepo.updateWorkspace(workspaceId, payload);
}

export const deleteWorkspace = async () => {

}

export const addWorkspaceMember = async () => {

}

export const getAllWorkspaceMembers = async () => {

}

export const getWorkspaceMember = async () => {

}

export const removeWorkspaceMember = async () => {

}