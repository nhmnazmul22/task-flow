import z from "zod";

export const validateData = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error),
    };
  }
  return {
    success: true,
    data: result.data,
  };
};
