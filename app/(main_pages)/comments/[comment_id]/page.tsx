
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CommentCard from "@/app/components/Cards/CommentCard";
import { Link } from "@nextui-org/react";
import { getUser, getComment, getReplies } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { CommentReplyButton } from "@/app/components/Buttons/DiscussionButtons";
import { Undo2 } from "lucide-react";

export default async function CommentPage(
    { params }: { params: { comment_id: string } }
) {

    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    const comment = await getComment(params.comment_id);
    const replies = await getReplies(comment.replies);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading={params.comment_id} subheading={"test"}>
                <Link isBlock showAnchorIcon href={"/discussions/" + comment.discussion_association} className="return_discussion" anchorIcon={<Undo2 />} >
                    Return to discussion &nbsp;
                </Link>
                <CommentCard comment={JSON.parse(JSON.stringify(comment))} />
                <div className="replies_container">
                    <div className="comments_container_header">
                        <h1 className="heading">
                            Replies
                        </h1>
                        <CommentReplyButton user={JSON.parse(JSON.stringify(user))} comment={JSON.parse(JSON.stringify(comment))} />
                    </div>
                    {replies.map((reply) => (
                        <CommentCard key={reply.id} comment={JSON.parse(JSON.stringify(reply))} />
                    ))}
                </div>
            </ContentContainer>
        </>
    )
}