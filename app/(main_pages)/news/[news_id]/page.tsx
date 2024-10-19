
import SideBar from "@/app/components/General/SideBar";
import ContentContainer from "@/app/components/General/ContentContainer";
import CardContainer from "@/app/components/General/CardContainer";
import StoryCard from "@/app/components/Cards/StoryCard";
import { LikeStoryButton, DiscussionButton } from "@/app/components/Buttons/StoryButtonsClient";
import { SourceButton, RelatedStoriesSourceButton } from "@/app/components/Buttons/StoryButtonsServer";
import { convertTimestampToDate, getStory, getRelatedStories, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

export default async function NewsStory(
    { params }: { params: { news_id: string } }
) {

    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    const story = await getStory(params.news_id);
    const related_stories = await getRelatedStories(params.news_id, story.snippet_association);

    return (
        <>
            <SideBar />
            <ContentContainer heading={story.title} subheading={convertTimestampToDate(story.date_added).toDateString()}>
                <div className="story_text_container">
                    <h2 className="secondary_heading">
                        Summary
                    </h2>
                    <p className="story_text">
                        {story.summary}
                    </p>
                </div>
                <div className="story_text_metadata_container">
                    <LikeStoryButton user={JSON.parse(JSON.stringify(user))} story={JSON.parse(JSON.stringify(story))} />
                    <DiscussionButton user={JSON.parse(JSON.stringify(user))} story={JSON.parse(JSON.stringify(story))} />
                    <SourceButton story={JSON.parse(JSON.stringify(story))} />
                    <RelatedStoriesSourceButton story={JSON.parse(JSON.stringify(story))} />
                </div>
                <CardContainer heading="Related News">
                    {related_stories.map((story) => (
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}