
import StoryCard from "./StoryCard";
import { Discussion } from "@/firebase/database_types";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { getStory, getNumDays, getUser, getUsername } from "@/firebase/helper";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default async function DiscussionCard({ discussion, isFullWidth = false, isPressable = true }: { discussion: Discussion, isFullWidth?: boolean, isPressable?: boolean}) {

    const user = await getUser(discussion.user_association);
    const story = await getStory(discussion.story_association);

    var class_names = "";
    if (isFullWidth == true) {
      class_names = " discussion_width_full";
    }
    
    var discussion_link = "#";
    if (isPressable == true) {
        discussion_link = "/discussion/"+discussion.id
    }
    
    return (
        <a href={discussion_link}>
            <Card 
            className={"discussion_card"+class_names} 
            isPressable={isPressable}
            >
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={user.avatar} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-100">
                                {user.name}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                                {getUsername(user)}
                            </h5>
                        </div>
                    </div>
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
        </a>
    )
}