
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import RepliesContainer from "@/app/components/Containers/RepliesContainer";
import CommentCard from "@/app/components/Cards/CommentCard";
import { getUser, getComment, getReplies } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { ReturnButton } from "@/app/components/Buttons/Comment/CommentButtonsSSR";

// COMMENT PAGE
export default async function CommentPage(
    { params }: { 
        params: Promise<{ comment_id: string }>
    }
) {

    // Gets comment id
    const comment_id = (await params).comment_id;

    // Gets user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Gets comment and its replies
    const comment = await getComment(comment_id);
    const replies = await getReplies(comment.replies);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false}>
                <div className="comment_container">
                    <ReturnButton comment={JSON.parse(JSON.stringify(comment))} />
                    <CommentCard comment={JSON.parse(JSON.stringify(comment))} user={JSON.parse(JSON.stringify(user))} />
                </div>
                <RepliesContainer replies={JSON.parse(JSON.stringify(replies))} user={JSON.parse(JSON.stringify(user))} />
            </ContentContainer>
        </>
    )
}