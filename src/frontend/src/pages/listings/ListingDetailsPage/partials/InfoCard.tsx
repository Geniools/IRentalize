import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Info} from "lucide-react";
import DisplayableBlockNote from "@/components/DisplayableBlockNote/DisplayableBlockNote";

import {Block} from "@blocknote/core";

const InfoCard: React.FC<{ content?: Block[] }> = ({content}) => (
    <Card className="bg-background/10 backdrop-blur-lg border-muted">
        <CardHeader>
            <div className="flex items-center gap-3">
                <Info className="text-primary h-5 w-5"/>
                <CardTitle className="text-white">Details</CardTitle>
            </div>
        </CardHeader>

        <CardContent>
            <DisplayableBlockNote
                content={content}
            />
        </CardContent>
    </Card>
)

export default InfoCard