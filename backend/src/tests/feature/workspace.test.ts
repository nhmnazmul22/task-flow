import {getAuth} from "@/tests/helpers/auth.js";
import request from "supertest";
import app from "@/app.js";
import ResponseStatus from "@/config/status.js";
import WorkspaceModel from "@/models/workspace.model.js";
import {createNewWorkspace, findWorkspaceById} from "@/tests/factory/workspace.factory.js";

describe("POST: /workspaces/create", () => {
    it("Admin can create a workspace", async () => {
        // Arrange
        const {authCookies} = await getAuth();

        const payload = {
            name: "testing workspace",
        };

        // Act
        const response = await request(app)
            .post("/workspaces/create")
            .set("Cookie", [authCookies])
            .set("content-type", "application/json")
            .send(payload);

        // Assert
        expectResponse(response, ResponseStatus.CREATED);
        expect(response.body).toHaveProperty(
            "message",
            "Workspace created successfully",
        );
    });
    it('Workspace create initial Workspace Member first time', async () => {
        // Arrange
        const {authCookies} = await getAuth();
        const payload = {
            name: "testing workspace",
        };

        // Act
        const response = await request(app)
            .post("/workspaces/create")
            .set("Cookie", [authCookies])
            .set("content-type", "application/json")
            .send(payload);

        // Assert
        expectResponse(response, ResponseStatus.CREATED);
        expect(response.body).toHaveProperty(
            "message",
            "Workspace created successfully",
        );

        // DB data check
        const workspace = await WorkspaceModel.findById(response.body.data._id);
        console.log(workspace);
        expect(workspace).not.toBeNull();
        expect(workspace?.name).toBe(payload.name);
    })
});


describe("PUT: /workspaces/update/:id", () => {
    it("Admin can update a existing workspace", async () => {
        // Arrange
        const {authCookies, userInfo} = await getAuth();

        const existingWorkspace = await createNewWorkspace({
            owner: userInfo._id.toString(),
            tenant: userInfo.tenantId as string
        });

        const payload = {
            name: "updated workspace",
        };

        // Act
        const response = await request(app)
            .put(`/workspaces/update/${existingWorkspace._id.toString()}`)
            .set("Cookie", [authCookies])
            .set("content-type", "application/json")
            .send(payload);

        // Assert
        expectResponse(response, ResponseStatus.ACCEPTED);
        expect(response.body).toHaveProperty(
            "message",
            "Workspace updated successfully",
        );

        console.log(response.body);
        const workspace = await findWorkspaceById(response.body.data._id);
        expect(workspace?.name).toBe(payload.name);
    });
});


describe("DELETE: /workspaces/deleted/:id", () => {
    it('owner can delete the workspaces')
})