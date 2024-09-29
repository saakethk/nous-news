"use client";

import {Card, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

function getTitle(headline: string) {
    if (headline != null) {
        if (headline.length > 65) {
            return headline.substring(0, 65) + "...";
        }
        return headline;
    }
    return "Default heading";
}

export default function StoryCard({id, headline, image_url, views}: {id: string, headline: string, image_url: string, views: number}) {
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
                            <h1 className="text-large font-medium mt-2">{getTitle(headline)}</h1>
                            <p className="font-semibold text-small text-foreground/80">Story · {views ? views : 0} views</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
