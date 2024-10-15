import ContactUsForm from "@/components/forms/ContactUsForm";

const ContactUsPage = () => {
    return (
        <div className="flex gap-3 px-28">
            <div className="flex-1 flex flex-col gap-3">
                <h1 className="font-bold text-5xl mb-5">
                    Contact Us
                </h1>

                <p>
                    Have a question or need help? Please fill out the form below and we will get back to you
                    <b> within 24 hours</b>!
                </p>

                <p>
                    You can also reach us at
                    <i>
                        <strong>
                            <a href="mailto:info@irentalize.nl"> info@irentalize.nl</a>
                        </strong>
                    </i>
                </p>

                <div>
                    <p>
                        Or give us a call:
                    </p>
                    <p>
                        <i> <a href="tel:+31684437948">+31 6 84437948</a></i>
                    </p>
                    <p>
                        <i><a href="tel:+31625477551">+31 6 25477551</a></i>
                    </p>
                </div>
            </div>

            <div className="flex-1 px-28">
                <ContactUsForm/>
            </div>
        </div>
    )
}

export default ContactUsPage