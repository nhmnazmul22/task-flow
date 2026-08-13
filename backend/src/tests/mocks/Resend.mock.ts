import { vi } from "vitest";

vi.mock("resend", () => {
  return {
    Resend: vi.fn(function () {
      return {
        emails: {
          send: vi.fn().mockResolvedValue({
            data: {
              id: "test-email-id",
            },
            error: null,
          }),
        },
      };
    }),
  };
});
