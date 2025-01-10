import {Camera} from "lucide-react";

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";

const ListingHeader: React.FC<{ name: string; category: ListingCategory }> = ({name, category}) => (
    <Card className="mb-8 bg-background/10 backdrop-blur-lg border-muted">
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={category.icon} alt={category.name}/>
                <AvatarFallback><Camera className="h-6 w-6"/></AvatarFallback>
            </Avatar>

            <div>
                <CardTitle className="text-3xl text-white">{name}</CardTitle>

                <CardDescription>
                    <div>
                        <Badge variant="secondary" className="mt-2">
                            {category.name}
                        </Badge>
                    </div>
                </CardDescription>
            </div>
        </CardHeader>
    </Card>
)

export default ListingHeader