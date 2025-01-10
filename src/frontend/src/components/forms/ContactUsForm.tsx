import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useForm} from "react-hook-form"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea";

import {toast} from "sonner"

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, {
            message: "First Name must be at least 2 characters.",
        })
        .optional()
        .or(z.literal("")),
    lastName: z
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
})


const ContactUsForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            phone: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // TODO: Submit the form data to the backend
        console.log(data)
        toast.success("Form submitted successfully!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className={"flex-1"}>
                                <FormLabel>First Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem className={"flex-1"}>
                                <FormLabel>Last Name</FormLabel>

                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>

                            <FormControl>
                                <Input placeholder="Email" {...field} />
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
                            <FormLabel>Phone</FormLabel>

                            <FormControl>
                                <Input placeholder="Phone" {...field} />
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
                            <FormLabel>Message *</FormLabel>

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

                <Button className="" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ContactUsForm