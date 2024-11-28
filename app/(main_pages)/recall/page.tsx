
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardPaginatedContainer from "@/app/components/Containers/CardPaginatedContainer";
import { getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { RecallSummaryContainer } from "@/app/components/Containers/RecallSummaryContainer";

// RECALL PAGE
export default async function Recall() {

    // Retrieves user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    return (
        <>
            <SideBar />
            <ContentContainer heading="Recall">
                <RecallSummaryContainer user={JSON.parse(JSON.stringify(user))} />
                <hr/>
                <CardPaginatedContainer heading="Your Following" description="Sources you follow" ids={user.following} type="sources" user={user} />
                <CardPaginatedContainer heading="Your Comments" description="Comments you have made" ids={user.comments} type="comments" user={user} />
                <CardPaginatedContainer heading="Your Discussions" description="Discussions you have made" ids={user.discussed} type="discussions" user={user} />
                <hr/>
                <CardPaginatedContainer heading="Liked Stories" description="Stories you have liked" ids={user.liked} type="stories" user={user} />
                <CardPaginatedContainer heading="Liked Discussions" description="Discussions you have liked" ids={user.liked_discussions} type="discussions" user={user} />
                <CardPaginatedContainer heading="Liked Comments" description="Comments you have liked" ids={user.liked_comments} type="comments" user={user} />
            </ContentContainer>
        </>
    )
}
