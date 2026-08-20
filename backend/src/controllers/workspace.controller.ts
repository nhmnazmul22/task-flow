import type { Request, Response } from "express";
import * as WorkspaceService from "@/services/workspace.service.js";

export const getAllWorkspaces = async (req: Request, res: Response) => {};
export const createWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.createWorkspace(req);

  return res.status(201).json({
    success: true,
    message: "Workspace created successfully",
    data: result,
  });
};
export const updateWorkspace = async (req: Request, res: Response) => {

};
export const deleteWorkspace = async (req: Request, res: Response) => {};

export const addWorkspaceMember = async (req: Request, res: Response) => {};
export const getAllWorkspaceMembers = async (req: Request, res: Response) => {};
export const getWorkspaceMember = async (req: Request, res: Response) => {};
export const removeWorkspaceMember = async (req: Request, res: Response) => {};
