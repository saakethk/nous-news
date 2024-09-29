import {Card, CardBody, Image} from "@nextui-org/react";

export default function SourceCard({source, image_url, num_stories}: {source: string, image_url: string, num_stories: number}) {
    return (
        <Card
            isBlurred
            isPressable
            className="border-none bg-background/60 dark:bg-default-100/50 basic_card"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Thumbnail"
                            className="object-cover"
                            height={100}
                            shadow="md"
                            src={image_url ? image_url:"https://nextui.org/images/album-cover.png"}
                            width="100%"
                        />
                    </div>
        
                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex flex-col gap-0 basic_card_text">
                            <h1 className="text-large font-medium mt-2">{source}</h1>
                            <p className="font-semibold text-small text-foreground/80">{num_stories ? num_stories : 0} stories</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
