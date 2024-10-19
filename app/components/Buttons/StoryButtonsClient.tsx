
"use client";

import DiscussionModal from "../Modals/DiscussionModal";
import { ThumbsUp, MessageSquarePlus } from "lucide-react";
import { User, Story } from "@/firebase/database_types";
import { likeStory, checkLikesStory } from "@/firebase/helper";
import { useEffect, useState } from "react";
import { Skeleton, useDisclosure, Button } from '@nextui-org/react';

// Button for liking story
function LikeStoryButton({ user, story }: { user: User, story: Story }) {

    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLiked(await checkLikesStory(user, story));
            setIsLoading(false);
        })();
    }, [])

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

// Button for creating discussion
function DiscussionButton({ user, story }: { user: User, story: Story }) {
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

export { LikeStoryButton, DiscussionButton };
