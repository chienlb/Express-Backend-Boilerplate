import { z } from "zod";

export const findRoleByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    permissions: z.array(z.string()).min(1, "Permissions is required"),
  }),
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export const softDeleteRoleSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export const hardDeleteRoleSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});
