import { Card, CardHeader, Avatar, CardFooter, CardBody } from "@nextui-org/react";
import { Comment } from "@/firebase/database_types";
import { getUser } from "@/firebase/helper";

export default async function CommentCard({ comment }: { comment: Comment }) {
    console.log(comment);
    const user = await getUser(comment.user_association);
    return (
        <Card className="comment_card">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={user.avatar} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {user.name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                            {comment.text}
                        </h5>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                    {comment.text}
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                        {comment.likes}
                    </p>
                    <p className=" text-default-400 text-small">Likes</p>
                </div>
            </CardFooter>
        </Card>
    )
}