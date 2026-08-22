import WorkspaceModel from "@/models/workspace.model.js";
import type {WorkspaceType} from "@/types/workspace.js";
import {createUser} from "@/tests/factory/auth.factory.js";

export const createNewWorkspace = async (data?: Partial<WorkspaceType>) => {
    const user = await createUser();
    return await WorkspaceModel.create({
        name: "Testing Workspace",
        slug: "testing-workspace",
        owner: user._id.toString(),
        tenant: user.tenantId?.toString() as string,
        ...data,
    })
}

export const findWorkspaceById = async (id: string) => {
    return await WorkspaceModel.findById(id);
}
