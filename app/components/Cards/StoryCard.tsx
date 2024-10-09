"use client";

import {Card, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

function getTitle(headline: string, cutoff: number) {
    if (headline != null) {
        if (headline.length > cutoff) {
            return headline.substring(0, cutoff) + "...";
        }
        return headline;
    }
    return "Default heading";
}

function StoryCard({id, headline, image_url, likes}: {id: string, headline: string, image_url: string, likes: number}) {
    const router = useRouter();
    return (
        <Card
            isBlurred
            isPressable
            className="border-none bg-background/60 dark:bg-default-100/50 basic_card"
            shadow="sm"
            onPress={() => router.push(`/news/${id}`)}
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Thumbnail"
                            className="object-cover"
                            height={150}
                            shadow="md"
                            src={image_url ? image_url:"https://nextui.org/images/album-cover.png"}
                            width="100%"
                        />
                    </div>
        
                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex flex-col gap-0 basic_card_text">
                            <h1 className="text-large font-medium mt-2">{getTitle(headline, 65)}</h1>
                            <p className="font-semibold text-small text-foreground/80">Story · {likes ? likes : 0} Likes</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

function StoryCardBrief({id, headline, image_url, likes}: {id: string, headline: string, image_url: string, likes: number}) {
    const router = useRouter();
    return (
        <Card
            isBlurred
            isPressable
            className="border-none bg-background/60 dark:bg-default-100/50 basic_card_brief"
            shadow="sm"
            onPress={() => router.push(`/news/${id}`)}
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
                            <h1 className="text-large font-medium mt-2">{getTitle(headline, 25)}</h1>
                            <p className="font-semibold text-small text-foreground/80">Story · {likes ? likes : 0} Likes</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export { StoryCard, StoryCardBrief };
