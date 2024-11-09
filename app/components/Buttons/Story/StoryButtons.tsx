
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/045/24

// TYPE
"use client";

// IMPORTS
import DiscussionModal from "../../Modals/DiscussionModal";
import { ThumbsUp, MessageSquarePlus, ExternalLink } from "lucide-react";
import { User, Story } from "@/firebase/database_types";
import { likeStory, checkLikesStory } from "@/firebase/helper";
import { useEffect, useState } from "react";
import { Skeleton, useDisclosure, Button, Link } from '@nextui-org/react';
import { useRouter } from "next/navigation";

// LIKE STORY BUTTON
function LikeStoryButton({ user, story }: { user: User, story: Story }) {

    // Stores whether button is loading and liked
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            setIsLiked(await checkLikesStory(user, story));
            setIsLoading(false);
        })();
    }, [])

    // Runs like function when clicked
    const handleClick = async () => {
        const { success, likes } = await likeStory(user, story);
        if (success) {
            setIsLiked(true);
            story.likes = likes
        }
    } 

    if (isLoading) {
        return (
            <Button endContent={<ThumbsUp />} className="story_text_metadata_button" isDisabled>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </Button>
        )
    }
    else if (isLiked) {
        return (
            <Button endContent={<ThumbsUp />} className="story_text_metadata_button" isDisabled>
                {story.likes} Likes
            </Button>
        )
    } else {
        return (
            <Button endContent={<ThumbsUp />} className="story_text_metadata_button" onPress={handleClick}>
                Like 
            </Button>
        )
    }
}

// CREATE DISCUSSION BUTTON
function DiscussionButton({ user, story }: { user: User, story: Story }) {

    // Gets functions to interact with modal
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} endContent={<MessageSquarePlus />} className="story_text_metadata_button">
                Discuss
            </Button>
            <DiscussionModal user={user} onOpenChange={onOpenChange} isOpen={isOpen} story={story} />
        </>
    )
}

// SOURCE BUTTON
function SourceButton({ story }: { story: Story }) {

    // Loads functions for routing
    const router = useRouter();

    return (
        <Button endContent={<ExternalLink />} className="story_text_metadata_button" onPress={() => {router.push(story.link)}}>
            Source
        </Button>
    )
}

export { 
    SourceButton,
    LikeStoryButton, 
    DiscussionButton 
}
