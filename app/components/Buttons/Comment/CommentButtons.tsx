
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use client";

// IMPORTS
import ReplyModal from "../../Modals/ReplyModal";
import { User, Comment } from "@/firebase/database_types";
import { useDisclosure, Button, Tooltip, Skeleton } from "@nextui-org/react";
import { Reply, Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { checkLikesComment, likeComment } from "@/firebase/helper";

// LIKE COMMENT BUTTON
function LikeCommentButton({ user, comment }: { user: User, comment: Comment }) {

    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLiked(await checkLikesComment(user, comment));
            setIsLoading(false);
        })();
    }, [])

    const handleClick = async () => {
        const { success, likes } = await likeComment(user, comment);
        if (success) {
            setIsLiked(true);
            comment.likes = likes
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
            <Tooltip content="Comment is liked" className="general_tooltip">
                <Button isIconOnly className="like_comment_button" isDisabled>
                    <Heart color="#ff0000" />
                </Button>
            </Tooltip>
        )
    } else {
        return (
            <Tooltip content="Like comment" className="general_tooltip">
                <Button isIconOnly className="like_comment_button" onPress={handleClick}>
                    <Heart /> 
                </Button>
            </Tooltip>
        )
    }
}

// VIEW REPLIES BUTTON - Button for creating comment replies
function ViewRepliesButton({ comment }: { comment: Comment }) {

    // Allows link to page
    const router = useRouter();

    return (
        <Tooltip content="View replies" className="general_tooltip">
            <Button isIconOnly className="comment_reply_button" onPress={() => router.push("/comment/" + comment.id)}>
                <Eye />
            </Button>
        </Tooltip>
    )
}

// REPLY BUTTON - Lets people reply to comment
function ReplyButton({ user, comment }: { user: User, comment: Comment }) {

    // Allows interaction with modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Tooltip content="Reply to comment" className="general_tooltip">
                <Button isIconOnly onPress={onOpen} className="comment_reply_button">
                    <Reply />
                </Button>
            </Tooltip>
            <ReplyModal user={user} comment={JSON.parse(JSON.stringify(comment))} onOpenChange={onOpenChange} isOpen={isOpen} />
        </>
    )
}

export { 
    ViewRepliesButton, 
    ReplyButton,
    LikeCommentButton
}
