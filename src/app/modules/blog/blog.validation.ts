import { z } from 'zod';

const blogValidationSchema = z.object({
    body: z.object({
        title: z.string().trim().min(1, 'Title is required'),
        content: z.string().trim().min(1, 'Content is required'),
        author: z.string().optional(), 
        isPublished: z.boolean().optional(),
    }),
});

export const blogValidation = {
    blogValidationSchema,
};

