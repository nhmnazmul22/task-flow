import ResponseStatus from "@/config/status.js";
import app from "@/app.js";
import {createUserData} from "@/tests/factory/auth.factory.js";
import {createAuthenticatedUser,} from "@/tests/helpers/auth.js";
import request from "supertest";

describe("POST /auth/login", () => {
    it("should login successfully with valid credentials", async () => {
        const {userData} = await createAuthenticatedUser();

        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: userData.email, password: userData.password});

        expectResponse(response, ResponseStatus.SUCCESS);
        expect(response.body).toHaveProperty("message", "Login successful");
        expect(response.body.data).toHaveProperty("token");
    });

    it("should set authToken cookie on successful login", async () => {
        const {userData} = await createAuthenticatedUser();

        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: userData.email, password: userData.password});

        expectResponse(response, ResponseStatus.SUCCESS);
        const setCookie = response.headers["set-cookie"] as unknown as string[];
        expect(setCookie).toBeDefined();
        const authCookie = setCookie.find((c) => c.startsWith("authToken="));
        expect(authCookie).toBeDefined();
    });

    it("should reject login with non-existent email", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: "nonexistent@example.com", password: "Password123!"});

        expectResponse(response, ResponseStatus.UNAUTHORIZED);
        expect(response.body).toHaveProperty("message", "Unauthorized");
    });

    it("should reject login with wrong password", async () => {
        const {userData} = await createAuthenticatedUser();

        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: userData.email, password: "WrongPassword123!"});

        expectResponse(response, ResponseStatus.UNAUTHORIZED);
        expect(response.body).toHaveProperty("message", "Unauthorized");
    });

    it("should reject login for unverified user", async () => {
        const userData = createUserData();

        await request(app)
            .post("/auth/register")
            .set("content-type", "application/json")
            .send(userData);

        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: userData.email, password: userData.password});

        expectResponse(response, ResponseStatus.FORBIDDEN);
        expect(response.body).toHaveProperty(
            "message",
            "You account not verified. Please, verify your email address.",
        );
    });

    it("should reject login with missing email", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({password: "Password123!"});

        expectResponse(response, ResponseStatus.BAD_REQUEST);
    });

    it("should reject login with missing password", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: "test@example.com"});

        expectResponse(response, ResponseStatus.BAD_REQUEST);
    });

    it("should reject login with invalid email format", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: "not-an-email", password: "Password123!"});

        expectResponse(response, ResponseStatus.BAD_REQUEST);
    });

    it("should reject login with short password", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({email: "test@example.com", password: "123"});

        expectResponse(response, ResponseStatus.BAD_REQUEST);
    });

    it("should reject login with empty body", async () => {
        const response = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({});

        expectResponse(response, ResponseStatus.BAD_REQUEST);
    });
});
