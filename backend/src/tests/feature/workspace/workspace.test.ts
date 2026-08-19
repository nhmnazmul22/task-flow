import app from "@/app.js";
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
});
