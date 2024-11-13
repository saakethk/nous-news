
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use client";

// IMPORTS
import { StoryCard, StoryCardLoader } from "./StoryCard";
import { Discussion, Story, User } from "@/firebase/database_types";
import { Card, CardHeader, CardBody, CardFooter, Avatar, ButtonGroup, Link, Skeleton } from "@nextui-org/react";
import { getStory, getNumDays, getUser, getUsername } from "@/firebase/helper";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { CommentButton, LikeDiscussionButton } from "../Buttons/Discussion/DiscussionButtons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// DISCUSSION CARD LOADER COMPONENT
function DiscussionCardLoader(
    { discussion, isFullWidth = false, isPressable = true, isAdaptable = false }: 
    { discussion?: Discussion, isFullWidth?: boolean, isPressable?: boolean, isAdaptable?: boolean }
) {
    return (
        <Link className={((isAdaptable) ? "adaptable_card": "")+((isFullWidth) ? "discussion_width_full ": "")}>
            <Card 
            className={"discussion_card "+((isFullWidth) ? "discussion_card_expanded ": "")} 
            >
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
                <CardBody className="px-3 py-0 text-small text-default-400 gap-1">
                    {
                        (discussion == undefined) ?
                        <>
                            <Skeleton className="w-5/5 rounded-lg loader mt-1">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-5/5 rounded-lg loader mt-1">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-5/5 rounded-lg loader mt-1">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </>:
                        <p>
                            {discussion!.text}
                        </p>
                    }
                    <div className="discussion_reference_card">
                        <StoryCardLoader isFullWidth={true} isPressable={!isPressable} />
                    </div>
                </CardBody>
                <CardFooter className="gap-3 justify-between">
                    {
                        (discussion == undefined) ?
                        <>
                            <Skeleton className="w-1/5 rounded-lg loader">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-1/5 rounded-lg loader">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </>:
                        <>
                            <div className="flex gap-1 font-semibold text-default-400 text-small">
                                {getNumDays(discussion!.date_created)}
                            </div>
                            <div className="flex gap-1 font-semibold text-default-400 text-small">
                                {discussion!.comments.length}
                                <MessageCircle size={18} />
                                {discussion!.likes}
                                <ThumbsUp size={18} />
                            </div>
                        </>
                    }
                </CardFooter>
            </Card>
        </Link>
    )
}

// DISCUSSION CARD COMPONENT
function DiscussionCard(
    { discussion, isFullWidth = false, isPressable = true, isAdaptable = false }: 
    { discussion: Discussion, isFullWidth?: boolean, isPressable?: boolean, isAdaptable?: boolean }
) {

    // Stores whether button is loading, user, and story
    const [user, setUser] = useState({} as User);
    const [story, setStory] = useState({} as Story);
    const [isLoading, setIsLoading] = useState(true);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            // Gets user and story associated with discussion
            setUser(await getUser(discussion.user_association));
            setStory(await getStory(discussion.story_association));
            setIsLoading(false);
        })();
    }, [])
    
    return (
        <>
        {(!isLoading) ?
            <>
                <Link className={((isAdaptable) ? "adaptable_card": "")+((isFullWidth) ? "discussion_width_full ": "")} href={(isPressable) ? "/discussion/"+discussion.id : "#"}>
                    <Card 
                    className={"discussion_card "+((isFullWidth) ? "discussion_card_expanded ": "")} 
                    >
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="sm" src={user.avatar} />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-100">
                                        {user.name}
                                    </h4>
                                    <h5 className="text-small tracking-tight text-default-400">
                                        {getUsername(user)}
                                    </h5>
                                </div>
                            </div>
                            <ButtonGroup className="comment_reply_buttons">
                                <LikeDiscussionButton 
                                user={JSON.parse(JSON.stringify(user))} 
                                discussion={JSON.parse(JSON.stringify(discussion))} 
                                />
                                <CommentButton 
                                user={JSON.parse(JSON.stringify(user))} 
                                discussion={JSON.parse(JSON.stringify(discussion))} 
                                />
                            </ButtonGroup>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>
                                {discussion.text}
                            </p>
                            <div className="discussion_reference_card">
                                <StoryCard story={JSON.parse(JSON.stringify(story))} isFullWidth={true} isPressable={!isPressable} />
                            </div>
                        </CardBody>
                        <CardFooter className="gap-3 justify-between">
                            <div className="flex gap-1 font-semibold text-default-400 text-small">
                                {getNumDays(discussion.date_created)}
                            </div>
                            <div className="flex gap-1 font-semibold text-default-400 text-small">
                                {discussion.comments.length}
                                <MessageCircle size={18} />
                                {discussion.likes}
                                <ThumbsUp size={18} />
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            </>:
            <>
                <DiscussionCardLoader discussion={discussion} isAdaptable={isAdaptable} isFullWidth={isFullWidth} />
            </>
        }
        </>
    )
}

export {
    DiscussionCard,
    DiscussionCardLoader
}