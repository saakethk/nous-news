
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use client";

// IMPORTS
import CommentModal from "../../Modals/CommentModal";
import { Discussion, User } from "@/firebase/database_types";
import { Button, Tooltip, Skeleton, useDisclosure } from "@nextui-org/react";
import { Heart, Reply } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { checkLikesDiscussion, likeDiscussion } from "@/firebase/helper";

// LIKE DISCUSSION BUTTON
function LikeDiscussionButton({ user, discussion }: { user: User, discussion: Discussion }) {

    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLiked(await checkLikesDiscussion(user, discussion));
            setIsLoading(false);
        })();
    }, [])

    const handleClick = async () => {
        const { success, likes } = await likeDiscussion(user, discussion);
        if (success) {
            setIsLiked(true);
            discussion.likes = likes
            router.refresh();
        }
    } 

    if (isLoading) {
        return (
            <Button className="like_comment_button" isDisabled>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </Button>
        )
    }
    else if (isLiked) {
        return (
            <Tooltip content="Discussion is liked" className="general_tooltip">
                <Button isIconOnly className="like_comment_button" isDisabled>
                    <Heart color="#ff0000" />
                </Button>
            </Tooltip>
        )
    } else {
        return (
            <Tooltip content="Like discussion" className="general_tooltip">
                <Button isIconOnly className="like_discussion_button" onPress={handleClick}>
                    <Heart /> 
                </Button>
            </Tooltip>
        )
    }
}

// COMMENT BUTTON - Button for creating comments
function CommentButton({ user, discussion }: { user: User, discussion: Discussion }) {

    // Allows interaction with modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Tooltip content="Reply to discussion" className="general_tooltip">
                <Button isIconOnly className="like_discussion_button" onPress={onOpen}>
                    <Reply /> 
                </Button>
            </Tooltip>
            <CommentModal user={user} onOpenChange={onOpenChange} isOpen={isOpen} discussion={discussion} />
        </>
    )
}

export {
    CommentButton,
    LikeDiscussionButton
}