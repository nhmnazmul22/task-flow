import app from "@/app.js";
import {getAuth} from "@/tests/helpers/auth.js";
import request from "supertest";
import {createNewWorkspace, findWorkspaceById} from "@/tests/factory/workspace.factory.js";
import ResponseStatus from "@/config/status.js";

describe("Workspace Update Testing", () => {
    it("Admin can update a existing workspace", async () => {
        // Arrange
        const {authCookies, userInfo} = await getAuth();

        const existingWorkspace = await createNewWorkspace({
            ownerId: userInfo._id.toString(),
            tenantId: userInfo.tenantId as string
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
