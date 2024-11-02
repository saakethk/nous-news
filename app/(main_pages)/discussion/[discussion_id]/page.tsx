
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import DiscussionCard from "@/app/components/Cards/DiscussionCard";
import CommentCard from "@/app/components/Cards/CommentCard";
import { getComments, getDiscussion, getUser } from "@/firebase/helper";
import { CommentButton } from "@/app/components/Buttons/DiscussionButtons";
import { currentUser } from "@clerk/nextjs/server";

export default async function DiscussionPage(
    { params }: { params: { discussion_id: string } }
) {

    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    const discussion = await getDiscussion(params.discussion_id);
    const comments = await getComments(discussion.comments);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading={params.discussion_id}>
                <div className="discussion_card_container">
                    <DiscussionCard discussion={JSON.parse(JSON.stringify(discussion))} isFullWidth={true} isPressable={false} />
                </div>
                <div className="comments_container">
                    <div className="comments_container_header">
                        <h1 className="heading">
                            Comments
                        </h1>
                        <CommentButton user={user} discussion={JSON.parse(JSON.stringify(discussion))} />
                    </div>
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={JSON.parse(JSON.stringify(comment))} />
                    ))}
                </div>
            </ContentContainer>
        </>
    )
}