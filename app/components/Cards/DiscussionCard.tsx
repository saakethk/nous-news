import { Discussion } from "@/firebase/database_types";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react";
import { StoryCardBrief } from "./StoryCard";
import { getNewsStory, getUser } from "@/firebase/helper";

function getUsername(email: string) {
    return email.substring(0, email.indexOf("@"));
}

export default async function DiscussionCard({ discussion, type = 0 }: { discussion: Discussion, type?: number}) {
    const story = await getNewsStory(discussion.story_association);
    const user = await getUser(discussion.user_association);
    var styletype = ["", "discussion_card"];
    if (type == 1) {
        var styletype = ["discussion_card_container", "discussion_card_expanded"];
    }
    return (
        <Link className={styletype[0]} href={"/discussions/"+discussion.id}>
            <Card className={styletype[1]}>
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={user.avatar} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {user.name}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                                @{getUsername(user.email)}
                            </h5>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        {discussion.text}
                    </p>
                    <div className="discussion_reference_card">
                        <StoryCardBrief id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                    </div>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">
                            {discussion.likes}
                        </p>
                        <p className=" text-default-400 text-small">Likes</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">
                            {discussion.comments.length}
                        </p>
                        <p className="text-default-400 text-small">Comments</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}