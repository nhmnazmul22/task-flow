import ResponseStatus from "@/config/status.js";
import app from "@/app.js";
import request from "supertest";

describe("POST /auth/logout", () => {
  it("should logout successfully", async () => {
    const response = await request(app).post("/auth/logout").send();

    expectResponse(response, ResponseStatus.SUCCESS);
    expect(response.body).toEqual({
      success: true,
      message: "Logout successful",
    });
  });
});
