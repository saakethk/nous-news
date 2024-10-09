
import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import { StoryCard } from "@/app/components/Cards/StoryCard";
import { LikeStoryButton, DiscussionButton, SourceButton, RelatedStoriesSourceButton } from "@/app/components/Buttons/StoryButtons";
import { convertTimestampToDate, getStory, getRelatedStories } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

export default async function NewsStory(
    { params }: { params: { news_id: string } }
) {

    const user = await currentUser();
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
                    <LikeStoryButton user_id={user!.id} story={JSON.parse(JSON.stringify(story))} />
                    <DiscussionButton user_id={user!.id} story={JSON.parse(JSON.stringify(story))} />
                    <SourceButton story={JSON.parse(JSON.stringify(story))} />
                    <RelatedStoriesSourceButton story={JSON.parse(JSON.stringify(story))} />
                </div>
                <CardContainer heading="Related News">
                    {related_stories.map((story) => (
                        <StoryCard key={story.id} id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}