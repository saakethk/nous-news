
import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import SnippetExpandedCard from "@/app/components/Cards/SnippetExpandedCard";
import { convertTimestampToDate } from "@/firebase/helper";
import { getSnippet, getStories } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/react";
import { ArrowDown } from "lucide-react";

export default async function SnippetPage(
    { params }: { params: { snippet_id: string } }
) {

    const user = await currentUser();
    const snippet = await getSnippet(params.snippet_id);
    const stories = await getStories(snippet.stories);
    
    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading="Snippet" subheading={"Stories on "+convertTimestampToDate(snippet.date_created).toDateString()}>
                <div className="snippet_card_container">
                    <div key="starter" className="snippet_card_expanded">
                        <div className="snippet_card_title heading">
                            <h1 className="subheading" style={{color: "white"}}>
                                { snippet.title }
                            </h1>
                            <h2 className="secondary_heading" style={{color: "#b1b1b1"}}>
                                { convertTimestampToDate(snippet.date_created).toDateString() }
                            </h2>
                        </div>
                        <div className="snippet_card_summary story_text_container">
                            <h2 className="secondary_heading">
                                Description
                            </h2>
                            <p className="story_text">
                                { snippet.description } 
                            </p>
                        </div>
                        <div className="snippet_card_metadata">
                            <Button className="snippet_starter" endContent={<ArrowDown/>}>
                                Scroll down to start your journey...
                            </Button>
                        </div>
                    </div>
                    {stories.map((story) => (
                        <SnippetExpandedCard key={story.id} user_id={user!.id} story={JSON.parse(JSON.stringify(story))} />
                    ))}
                </div>
            </ContentContainer>
        </>
    )
}