import {z} from "zod";

// Schema for the Contact Us form
export const formSchema = z.object({
    first_name: z
        .string()
        .min(2, {
            message: "First Name must be at least 2 characters.",
        })
        .optional()
        .or(z.literal("")),
    middle_name: z
        .string()
        .min(2, {
            message: "Middle Name must be at least 2 characters.",
        })
        .optional()
        .or(z.literal("")),
    last_name: z
        .string()
        .min(2, {
            message: "Last Name must be at least 2 characters.",
        })
        .optional()
        .or(z.literal("")),
    email: z
        .string()
        .email({
            message: "Please enter a valid email address.",
        }),
    message: z
        .string()
        .min(1, {
            message: "Message must have at least 1 character.",
        }),
    phone: z
        .string()
        .min(10, {
            message: "Phone number must be at least 10 characters.",
        })
        .optional()
        .or(z.literal("")),
    honeypot: z.string().optional().or(z.literal("")),
    recaptcha_token: z.string().min(1, "Please complete the reCAPTCHA")
})
