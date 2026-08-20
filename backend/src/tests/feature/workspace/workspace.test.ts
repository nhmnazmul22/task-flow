import app from "@/app.js";
import WorkspaceModel from "@/models/workspace.model.js";
import { getAuthCookies } from "@/tests/helpers/auth.js";
import request from "supertest";

describe("Workspace Testing", () => {
  it("Admin can create a workspace", async () => {
    // Arrange
    const cookie = await getAuthCookies();

    const payload = {
      name: "testing workspace",
    };

    // Act
    const response = await request(app)
      .post("/workspaces/create")
      .set("Cookie", [cookie])
      .set("content-type", "application/json")
      .send(payload);

    // Assert
    expectResponse(response, 201);
    expect(response.body).toHaveProperty(
      "message",
      "Workspace created successfully",
    );
  });
  it('Workspace create initial Workspace Member first time', async () => {
    // Arrange
    const cookie = await getAuthCookies();
    const payload = {
      name: "testing workspace",
    };

    // Act
    const response = await request(app)
        .post("/workspaces/create")
        .set("Cookie", [cookie])
        .set("content-type", "application/json")
        .send(payload);

    // Assert
    expectResponse(response, 201);
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
