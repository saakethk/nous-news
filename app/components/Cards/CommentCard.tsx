
import { Card, CardHeader, Avatar, CardFooter, CardBody, Button, ButtonGroup } from "@nextui-org/react";
import { Comment } from "@/firebase/database_types";
import { getUser, getUsername, getNumDays } from "@/firebase/helper";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { CommentReplyButton, CommentViewRepliesButton } from "../Buttons/DiscussionButtons";

export default async function CommentCard({ comment }: { comment: Comment }) {
    const user = await getUser(comment.user_association);
    return (
        <Card className="comment_card">
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
                <ButtonGroup className="comment_reply_buttons">
                    <CommentReplyButton user={JSON.parse(JSON.stringify(user))} comment={JSON.parse(JSON.stringify(comment))} />
                    <CommentViewRepliesButton comment={JSON.parse(JSON.stringify(comment))} />
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