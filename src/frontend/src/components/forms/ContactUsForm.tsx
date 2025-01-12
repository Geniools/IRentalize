import React from "react"
import axios from "axios";

import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {formSchema} from "@/components/forms/schemas/contactUsSchema"

import ReCAPTCHA from "react-google-recaptcha"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"

import {toast} from "sonner"

import type {ApiErrorResponse} from "@/lib/api"
import {contactService} from "@/lib/api/services"
import {useSearchParams} from "react-router-dom";


const ContactUsForm = () => {
    const [searchParams] = useSearchParams()
    const initialMessage = searchParams.get('listing_id') ? `I am interested in listing number '${searchParams.get('listing_id')}'.` : ""

    const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            message: initialMessage,
            phone: "",
            honeypot: "",
            recaptcha_token: "",
        },
    })

    const handleErrors = (error: unknown) => {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
            if (!error.response) {
                toast.error("Network error. Please check your connection.")
                return
            }

            const responseData = error.response?.data as ApiErrorResponse

            // Handle rate limiting
            if (error.response?.status === 429) {
                toast.error("Too many submissions. Please try again later.")
                return
            }

            // Handle validation errors
            if (error.response?.status === 400) {
                if (responseData.non_field_errors) {
                    // Handle non-field errors (honeypot)
                    toast.error(responseData.non_field_errors[0])
                    return;
                }

                if (responseData.detail) {
                    toast.error(responseData.detail)
                    return
                }

                // Handle field-specific errors
                Object.entries(responseData || {}).forEach(([fieldName, errorMessages]) => {
                    if (Array.isArray(errorMessages)) {
                        form.setError(
                            fieldName as keyof z.infer<typeof formSchema>,
                            {
                                type: 'server',
                                message: errorMessages[0]
                            }
                        )
                    }
                })
                toast.error("Please correct the errors in the form.")
                return
            }

            // Handle server errors
            if (error.response?.status >= 500) {
                toast.error("Server error. Please try again later.")
                return
            }

            // Handle network errors
            if (error.code === 'ECONNABORTED') {
                toast.error("Request timed out. Please try again.")
                return
            }
        }

        // Handle unexpected errors
        console.error('Form submission error:', error)
        toast.error("An unexpected error occurred. Please try again.")
    }

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await contactService.submit(data);
            // Success case
            toast.success("Form submitted successfully!");
            form.reset();
            recaptchaRef.current?.reset();
        } catch (error) {
            handleErrors(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({field}) => (
                            <FormItem className={"flex-1"}>
                                <FormLabel>First Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="First Name (Optional)" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="middle_name"
                        render={({field}) => (
                            <FormItem className={"flex-1"}>
                                <FormLabel>Middle Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="Middle Name (Optional)" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>Last Name</FormLabel>

                            <FormControl>
                                <Input placeholder="Last Name (Optional)" {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>

                            <FormControl>
                                <Input placeholder="Phone (Optional)" {...field} />
                            </FormControl>

                            <FormDescription>
                                A non-Dutch phone number <b>must</b> include the country code. (e.g. +31 6 12345678)
                            </FormDescription>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email <span className="font-black text-lg">*</span></FormLabel>

                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Message <span className="font-black text-lg">*</span></FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Message" {...field}
                                    className="w-full p-2 border border-gray-300 rounded min-h-20"
                                />
                            </FormControl>

                            <FormDescription>
                                Please mention the address and room number you are interested in (if applicable)
                            </FormDescription>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Honeypot field */}
                <input
                    type="text"
                    {...form.register("honeypot")}
                    style={{display: 'none'}}
                    tabIndex={-1}
                    autoComplete="off"
                />

                {/* reCAPTCHA */}
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_REACT_APP_GOOGLE_RECAPTCHA_KEY as string}
                    onChange={(token: string | null) => form.setValue('recaptcha_token', token || '')}
                />
                {form.formState.errors.recaptcha_token && (
                    <p className="text-destructive text-sm">
                        {form.formState.errors.recaptcha_token.message}
                    </p>
                )}

                <Button className="w-1/2" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ContactUsForm