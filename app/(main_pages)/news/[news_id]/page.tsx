import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import { Story, Snippet } from "@/app/(auth)/firebase/database_types";
import { db } from "@/app/(auth)/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { convertTimestampToDate } from "@/app/(auth)/firebase/helper";
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from "@nextui-org/react";
import CardContainer from "@/app/components/CardContainer";
import StoryCard from "@/app/components/StoryCard";

export async function getNewsStory(story_id: string) {
    const docRef = doc(db, "stories", story_id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Story;
}

async function getRelatedStories(current_story_id: string, snippet_association: string) {
    const snippetRef = doc(db, "snippets", snippet_association);
    const snippetSnap = await getDoc(snippetRef);
    const snippet = snippetSnap.data() as Snippet;

    const story_ids = snippet.stories.filter((id) => id !== current_story_id);

    const stories: Story[] = [];
    for (const story_id of story_ids) {
        const story = await getNewsStory(story_id);
        stories.push(story);
    }
    
    return stories;
}

export default async function NewsStory(
    { params }: { params: { news_id: string } }
) {
    const story = await getNewsStory(params.news_id);
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
                    <Link className="story_text_metadata_item" href={story.link}>
                        Source &nbsp; <ExternalLink />
                    </Link>
                    <Link className="story_text_metadata_item" href={story.link}>
                        {story.source} &nbsp; <ArrowRight />
                    </Link>
                </div>
                <CardContainer heading="Related News">
                    {related_stories.map((story) => (
                        <StoryCard key={story.id} id={story.id} headline={story.title} image_url={story.image} views={0} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}