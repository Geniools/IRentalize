import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
})


export function ContactUsForm() {
    // Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        }
    })

    // Define the submit function
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
}