
"use client";

import { Story } from "@/firebase/database_types";
import { getNumDays } from "@/firebase/helper";
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MessageCircle, ThumbsUp } from "lucide-react";

function getTitle(headline: string, cutoff: number) {
    if (headline != null) {
        if (headline.length > cutoff) {
            return headline.substring(0, cutoff) + "...";
        }
        return headline;
    }
    return "Default heading";
}

export default function StoryCard({ story, isFullWidth = false, isPressable = true }: { story: Story, isFullWidth?: boolean, isPressable?: boolean }) {
    
    const router = useRouter();

    var class_names = "";
    if (isFullWidth == true) {
        class_names = " story_width_full"
    }
    
    return (
        <div>
            <Card
                isBlurred
                isPressable={isPressable}
                className={"border-none basic_card"+class_names}
                shadow="sm"
                onPress={() => router.push("/story/"+story.id)}
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                alt="Thumbnail"
                                className="object-cover"
                                height={120}
                                shadow="md"
                                src={story.image}
                                width="100%"
                            />
                        </div>
            
                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex flex-col gap-0 basic_card_text">
                                <h1 className="text-large font-medium mt-2">{getTitle(story.title, 65)}</h1>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="gap-3 justify-between py-2 border-t-2 border-black">
                    <div className="flex gap-1 font-semibold text-default-400 text-small">
                        {getNumDays(story.date_added)}
                    </div>
                    <div className="flex gap-1 font-semibold text-default-400 text-small">
                        {story.discussions.length}
                        <MessageCircle size={18} />
                        {story.likes}
                        <ThumbsUp size={18} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
