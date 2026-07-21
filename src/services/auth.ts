export type payloadType = {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export type ResponseType = {
    success: boolean,
    message: string,
    data?: object
}

export const registerService = async (payload: payloadType): Promise<ResponseType> => {

    return {
        success: true,
        message: "Register successful"
    }
}