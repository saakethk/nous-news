"use client";

import DiscussionModal from "../DiscussionModal";
import { ThumbsUp, MessageSquarePlus, ExternalLink, ArrowRight } from "lucide-react";
import { Story } from "@/firebase/database_types";
import { likeStory, checkLikesStory } from "@/firebase/helper";
import { useEffect, useState } from "react";
import { Skeleton, useDisclosure, Button, Link } from '@nextui-org/react';

// Button for liking story
function LikeStoryButton({ user_id, story }: { user_id: string, story: Story }) {

    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    var likes = story.likes;

    useEffect(() => {
        (async () => {
            setIsLiked(await checkLikesStory(user_id, story.id));
            setIsLoading(false);
        })();
    }, [])

    const handleClick = async () => {
        setIsLiked(true);
        likes = await likeStory(user_id, story.id, story.likes);
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
                {likes} Likes
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
function DiscussionButton({ user_id, story }: { user_id: string, story: Story }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} endContent={<MessageSquarePlus />} className="story_text_metadata_button">
                Discuss
            </Button>
            <DiscussionModal user_id={user_id} onOpenChange={onOpenChange} isOpen={isOpen} story={story} />
        </>
    )
}

// Button for reading source
function SourceButton({ story }: { story: Story }) {
    return (
        <Link className="story_text_metadata_item" href={story.link}>
            Source &nbsp; <ExternalLink />
        </Link>
    )
}

function RelatedStoriesSourceButton({ story }: { story: Story }) {
    return (
        <Link className="story_text_metadata_item" href={"/news/sources/"+story.source}>
            {story.source} &nbsp; <ArrowRight />
        </Link>
    )
}

export { LikeStoryButton, DiscussionButton, SourceButton, RelatedStoriesSourceButton };
