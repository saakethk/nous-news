
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import SourceCard from "@/app/components/Cards/SourceCard";
import { CommentCard } from "@/app/components/Cards/CommentCard";
import { getUser, getStories, getDiscussions, getComments, getSources } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { StoryCard } from "@/app/components/Cards/StoryCard";
import { DiscussionCard } from "@/app/components/Cards/DiscussionCard";
import { RecallSummaryContainer } from "@/app/components/Containers/RecallSummaryContainer";

// RECALL PAGE
export default async function Recall() {

    // Retrieves user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Retrieves stories
    const stories = await getStories(user.liked);

    // Retrieves discussions
    const discussions = await getDiscussions(user.liked_discussions);

    // Retrieves comments
    const comments = await getComments(user.liked_comments);

    // Retrieves comments made by user
    const comments_made = await getComments(user.comments);

    // Retrieves discussions made by user
    const discussions_made = await getDiscussions(user.discussed);

    // Retrieves comments made by user
    const sources_followed = await getSources(user.following);

    return (
        <>
            <SideBar />
            <ContentContainer heading="Recall">
                <RecallSummaryContainer user={user} />
                <hr/>
                <CardContainer heading="Your Following" description="Sources you follow">
                    {sources_followed.map((source) => (
                        <SourceCard key={source.id} user={user} source={JSON.parse(JSON.stringify(source))} />
                    ))}
                </CardContainer>
                <CardContainer heading="Your Comments" description="Comments you have made">
                    {comments_made.map((comment) => (
                        <CommentCard key={comment.id} user={user} comment={JSON.parse(JSON.stringify(comment))} />
                    ))}
                </CardContainer>
                <CardContainer heading="Your Discussions" description="Discussions you have made">
                    {discussions_made.map((discussion) => (
                        <DiscussionCard key={discussion.id} current_user={user} discussion={JSON.parse(JSON.stringify(discussion))} isAdaptable={false} />
                    ))}
                </CardContainer>
                <hr/>
                <CardContainer heading="Liked Stories" description="Stories you have liked">
                    {stories.map((story) => (
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} isAdaptable={false} />
                    ))}
                </CardContainer>
                <CardContainer heading="Liked Discussions" description="Discussions you have liked">
                    {discussions.map((discussion) => (
                        <DiscussionCard key={discussion.id} current_user={user} discussion={JSON.parse(JSON.stringify(discussion))} isAdaptable={false} />
                    ))}
                </CardContainer>
                <CardContainer heading="Liked Comments" description="Comments you have liked">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} user={user} comment={JSON.parse(JSON.stringify(comment))} />
                    ))}
                </CardContainer>
            </ContentContainer>
        </>
    )
}
