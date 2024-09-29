import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import { Story, Snippet } from "@/app/(auth)/firebase/database_types";
import { db } from "@/app/(auth)/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { convertTimestampToDate } from "@/app/(auth)/firebase/helper";
import { ExternalLink, ThumbsUp } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { getNewsStory } from "@/app/(main_pages)/news/[news_id]/page";

async function getSnippet(snippet_id: string) {
    const docRef = doc(db, "snippets", snippet_id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Snippet;
}

async function getStories(story_ids: string[]) {
    const stories: Story[] = [];
    for (const story_id of story_ids) {
        const story = await getNewsStory(story_id);
        stories.push(story);
    }
    
    return stories;
}

export default async function SnippetPage(
    { params }: { params: { snippet_id: string } }
) {
    const snippet = await getSnippet(params.snippet_id);
    const stories = await getStories(snippet.stories);
    return (
        <>
            <SideBar />
            <ContentContainer heading="Snippet" subheading={"Stories on "+convertTimestampToDate(snippet.date_created).toDateString()}>
                <div className="snippet_card_container">
                    {stories.map((story) => (
                        <div key={story.id} className="snippet_card_expanded">
                            <div className="snippet_card_title heading" style={{background: "url("+story.image+")"}}>
                                {story.title}
                            </div>
                            <div className="snippet_card_summary">
                                {story.summary}
                            </div>
                            <div className="snippet_card_metadata">
                                <Button className="snippet_card_metadata_link" href={story.link}>
                                    Read More &nbsp; <ExternalLink size={15} />
                                </Button>
                                <Button className="snippet_card_metadata_link story_like_button" href={story.link}>
                                    Like &nbsp; <ThumbsUp size={15} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </>
    )
}