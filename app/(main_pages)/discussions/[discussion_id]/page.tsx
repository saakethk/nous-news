import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import { getComments, getDiscussion } from "@/firebase/helper";
import DiscussionCard from "@/app/components/Cards/DiscussionCard";
import CommentCard from "@/app/components/Cards/CommentCard";

export default async function DiscussionPage(
    { params }: { params: { discussion_id: string } }
) {
    const discussion = await getDiscussion(params.discussion_id);
    console.log(discussion.comments);
    const comments = await getComments(discussion.comments);
    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading={params.discussion_id} subheading={"test"}>
                <DiscussionCard discussion={JSON.parse(JSON.stringify(discussion))} type={1} />
                <div className="comments_container">
                    <h2 className="heading">
                        Comments
                        {comments.map((comment) => (
                            <CommentCard comment={JSON.parse(JSON.stringify(comment))} />
                        ))}
                    </h2>
                </div>
            </ContentContainer>
        </>
    )
}