import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Link} from "react-router-dom"

import {Calendar} from "lucide-react"

type ContactCardProps = {
    listingId?: number
}

const ContactCard: React.FC<ContactCardProps> = ({listingId}) => (
    <Card className="bg-background/10 backdrop-blur-lg border-muted">
        <CardHeader>
            <div className="flex items-center gap-3">
                <Calendar className="text-primary h-5 w-5"/>
                <CardTitle className="text-white">Availability</CardTitle>
            </div>
        </CardHeader>

        <CardContent>
            <Link to={`/contact-us/?listing_id=${listingId}`}>
                <Button className="w-full" size="lg">
                    Check Availability
                </Button>
            </Link>
        </CardContent>
    </Card>
)

export default ContactCard