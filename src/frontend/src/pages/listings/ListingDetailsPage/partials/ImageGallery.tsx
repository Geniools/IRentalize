import Autoplay from "embla-carousel-autoplay";

import {Card, CardContent} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const ImageGallery: React.FC<{ images?: string[] }> = ({images}) => (
    <Card className="bg-background/10 backdrop-blur-lg border-muted">
        <CardContent className="p-6">
            <Carousel plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnMouseEnter: true,
                    stopOnInteraction: true
                })
            ]} className="w-full">
                <CarouselContent>
                    {images?.map((image, index) => (
                        <CarouselItem className="basis-1/2 cursor-pointer" key={index}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`Listing image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </DialogTrigger>

                                {/*TODO: The background is not darkened/blurred when the dialog opens*/}
                                <DialogContent className="max-w-[70%]">
                                    <DialogHeader>
                                        <DialogTitle><i>Image {index + 1} of {images.length}</i></DialogTitle>
                                    </DialogHeader>

                                    <div className="aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`Listing image ${index + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </CardContent>
    </Card>
)

export default ImageGallery