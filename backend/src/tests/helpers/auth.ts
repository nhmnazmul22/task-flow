import app from "@/app.js";
import {createUserData, findUserByQuery} from "@/tests/factory/auth.factory.js";
import request from "supertest";
import TokenModel from "@/models/token.model.js";
import {TokenEnum} from "@/types/auth.js";
import {generateHashToken} from "@/utils/token.js";
import type {UserDocument, UserType} from "@/types/users.js";

export async function createAuthenticatedUser(): Promise<{
    cookies: string[],
    userInfo: UserDocument,
    userData: Partial<UserType>
}> {
    const userData = createUserData();

    await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send(userData);

    const tokenHash = generateHashToken();
    await TokenModel.create({
        email: userData.email,
        tokenHash,
        type: TokenEnum.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await request(app)
        .post(`/auth/verify-email?token=email_verification:${tokenHash}`)
        .send();

    const loginResponse = await request(app)
        .post("/auth/login")
        .set("content-type", "application/json")
        .send({email: userData.email, password: userData.password});

    const cookies = loginResponse.headers["set-cookie"] as unknown as string[];

    const userInfo = (await findUserByQuery({email: userData.email})) as UserDocument

    return {userData, userInfo, cookies};
}

export function extractCookie(cookies: string[], name: string): string {
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie?.split(";")[0] ?? "";
}

export async function getAuth(): Promise<{ authCookies: string, userInfo: UserDocument }> {
    const {cookies, userInfo} = await createAuthenticatedUser();
    const authCookies = extractCookie(cookies, "authToken")
    return {authCookies, userInfo};
}
