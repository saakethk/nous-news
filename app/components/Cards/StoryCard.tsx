
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use client";

// IMPORTS
import { Story } from "@/firebase/database_types";
import { getNumDays, formatTitle } from "@/firebase/helper";
import { Card, CardBody, Image, CardFooter, Skeleton } from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

// STORY CARD COMPONENT
function StoryCard(
    { story, isFullWidth = false, isPressable = true, isAdaptable = true}: 
    { story: Story, isFullWidth?: boolean, isPressable?: boolean, isAdaptable?: boolean }
) { 

    // Loads functions necessary for routing
    const router = useRouter();

    return (
        <Card
            isBlurred
            isPressable={isPressable}
            className={"border-none basic_card "+((isFullWidth) ? "story_width_full ": "")+((isAdaptable) ? "adaptable_card": "")}
            shadow="sm"
            onPress={() => {router.push("/story/"+story.id)}}
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Thumbnail"
                            className="object-cover"
                            height={120}
                            shadow="md"
                            src={((story.image != null) ? story.image : "https://firebasestorage.googleapis.com/v0/b/nous-news.appspot.com/o/defaults%2Fdefault_story_img.png?alt=media&token=2bde0122-6408-4e31-ba25-55b75920b323")}
                            width="100%"
                        />
                    </div>
                    <div className="flex flex-col col-span-6 md:col-span-8 size-full w-size">
                        <div className="flex flex-col gap-0 basic_card_text">
                            <h1 className="text-large font-medium mt-2">
                                {formatTitle(story.title, 65)}
                            </h1>
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
    )
}

// STORY CARD LOADER COMPONENT
function StoryCardLoader(
    { isFullWidth = false, isAdaptable = true }: 
    { isFullWidth?: boolean, isAdaptable?: boolean }
) {
    return (
        <Card
            isBlurred
            className={"border-none basic_card "+((isFullWidth) ? "story_width_full ": "")+((isAdaptable) ? "adaptable_card": "")}
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Skeleton className="object-cover rounded-lg loader">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
        
                    <div className="flex flex-col col-span-6 md:col-span-8 size-full w-size">
                        <div className="flex flex-col gap-2 basic_card_text">
                            <Skeleton className="w-5/5 rounded-lg loader mt-1">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-5/5 rounded-lg loader">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-5/5 rounded-lg loader">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="gap-3 justify-between py-2 border-t-2 border-black">
                <Skeleton className="w-1/5 rounded-lg loader">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-1/5 rounded-lg loader">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}

export {
    StoryCard,
    StoryCardLoader
}
