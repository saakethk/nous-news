
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import DiscussionCard from "@/app/components/Cards/DiscussionCard";
import RepliesContainer from "@/app/components/Containers/RepliesContainer";
import { getComments, getDiscussion, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

// DISCUSSION PAGE
export default async function DiscussionPage(
    { params }: { 
        params: Promise<{ discussion_id: string }>
    }
) {

    // Gets discussion id
    const discussion_id = (await params).discussion_id;

    // Gets user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Gets discussion and its comments
    const discussion = await getDiscussion(discussion_id);
    const comments = await getComments(discussion.comments);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false}>
                <div className="discussion_card_container">
                    <DiscussionCard discussion={JSON.parse(JSON.stringify(discussion))} isFullWidth={true} isPressable={false} />
                </div>
                <RepliesContainer replies={JSON.parse(JSON.stringify(comments))} user={JSON.parse(JSON.stringify(user))} />
            </ContentContainer>
        </>
    )
}