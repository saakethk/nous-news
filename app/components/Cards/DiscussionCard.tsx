
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import { StoryCard } from "./StoryCard";
import { Discussion } from "@/firebase/database_types";
import { Card, CardHeader, CardBody, CardFooter, Avatar, ButtonGroup, Link } from "@nextui-org/react";
import { getStory, getNumDays, getUser, getUsername } from "@/firebase/helper";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { CommentButton, LikeDiscussionButton } from "../Buttons/Discussion/DiscussionButtons";

// DISCUSSION CARD COMPONENT
export default async function DiscussionCard(
    { discussion, isFullWidth = false, isPressable = true, isAdaptable = false }: 
    { discussion: Discussion, isFullWidth?: boolean, isPressable?: boolean, isAdaptable?: boolean }
) {

    // Gets user and story associated with discussion
    const user = await getUser(discussion.user_association);
    const story = await getStory(discussion.story_association);
    
    return (
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
    )
}