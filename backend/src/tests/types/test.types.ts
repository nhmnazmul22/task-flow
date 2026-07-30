export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface TestUser {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  token?: string;
}

export interface RequestResult<T> {
  status: number;
  body: T;
}

export interface MultipartFormData {
  fields: Record<string, string>;
  file?: {
    fieldname: string;
    filename: string;
    contentType: string;
    data: Buffer;
  };
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
