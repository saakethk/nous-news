
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/22/24

// TYPE
"use client";

// IMPORTS
import { Card, CardHeader, Avatar, CardFooter, CardBody, ButtonGroup, Skeleton, Link } from "@nextui-org/react";
import { Comment, User } from "@/firebase/database_types";
import { getUser, getUsername, getNumDays } from "@/firebase/helper";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { LikeCommentButton, ReplyButton } from "../Buttons/Comment/CommentButtons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// COMMENT CARD LOADER
function CommentCardLoader(
    { comment }:
    { comment: Comment }
) {

    // Retrieves router functions
    const router = useRouter();

    return (
        <Card className="comment_card" onPress={() => router.push("/comment/"+comment.id)}>
            <CardHeader className="justify-between">
                <div className="flex gap-5 w-full">
                    <Skeleton className="flex rounded-full w-12 h-12"/>
                    <div className="w-3/5 flex flex-col gap-2">
                        <Skeleton className="w-3/5 rounded-lg loader">
                            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg loader">
                            <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </div>
                <ButtonGroup className="comment_reply_buttons">
                    <Skeleton className="w-5/5 rounded-lg loader mt-1">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-5/5 rounded-lg loader mt-1">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </ButtonGroup>
            </CardHeader>
            <CardBody className="px-3 py-0 pb-2 text-small text-default-400">
                <p>
                    {comment.text}
                </p>
            </CardBody>
            <CardFooter className="gap-3 justify-between py-2 border-t-2 border-black">
                <div className="flex gap-1 font-semibold text-default-400 text-small">
                    {getNumDays(comment.date_created)}
                </div>
                <div className="flex gap-1 font-semibold text-default-400 text-small">
                    {comment.replies.length}
                    <MessageCircle size={18} />
                    {comment.likes}
                    <ThumbsUp size={18} />
                </div>
            </CardFooter>
        </Card>
    )
}

// COMMENT CARD COMPONENT
function CommentCard(
    { comment, user, clickable=true }: 
    { comment: Comment, user: User, clickable?: boolean }
) {

    // Retrieves router functions
    const router = useRouter();

    // Sets associated user and loading status
    const [associated_user, setAssociatedUser] = useState({} as User);
    const [isLoading, setIsLoading] = useState(true);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            // Gets user and story associated with discussion
            setAssociatedUser(await getUser(comment.user_association));
            setIsLoading(false);
        })();
    }, [])

    return (
        <>
        {(!isLoading) ?
            <Link className="comment_card" href={(clickable) ? "/comment/"+comment.id : "#"}>
                <Card className="comment_card" onClick={() => {router.push("/comment/"+comment.id)}}>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="sm" src={associated_user.avatar} />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-100">
                                    {associated_user.name}
                                </h4>
                                <h5 className="text-small tracking-tight text-default-400">
                                    {getUsername(associated_user)}
                                </h5>
                            </div>
                        </div>
                        <ButtonGroup className="comment_reply_buttons">
                            <LikeCommentButton user={JSON.parse(JSON.stringify(user))} comment={JSON.parse(JSON.stringify(comment))} />
                            <ReplyButton user={JSON.parse(JSON.stringify(user))} comment={JSON.parse(JSON.stringify(comment))} />
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody className="px-3 py-0 pb-2 text-small text-default-400">
                        <p>
                            {comment.text}
                        </p>
                    </CardBody>
                    <CardFooter className="gap-3 justify-between py-2 border-t-2 border-black">
                        <div className="flex gap-1 font-semibold text-default-400 text-small">
                            {getNumDays(comment.date_created)}
                        </div>
                        <div className="flex gap-1 font-semibold text-default-400 text-small">
                            {comment.replies.length}
                            <MessageCircle size={18} />
                            {comment.likes}
                            <ThumbsUp size={18} />
                        </div>
                    </CardFooter>
                </Card>
            </Link>:
            <CommentCardLoader comment={comment} />
        }
        </>
    )
}

export {
    CommentCard,
    CommentCardLoader
}