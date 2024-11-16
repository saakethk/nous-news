
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import { SourceButton, DiscussionButton, LikeStoryButton } from "../Buttons/Story/StoryButtons";
import { Story, User, Snippet } from "@/firebase/database_types";
import { convertTimestampToDate } from "@/firebase/helper";
import { Button, Slider } from "@nextui-org/react";
import { ArrowDown, BadgeCheck } from "lucide-react";
import { SnippetFeedbackCard } from "./SnippetCard";

// SNIPPET EXPANDED CARD
async function SnippetExpandedCard(
    { user, story }: 
    { user: User, story: Story }
) {
    return (
        <div className="snippet_card_expanded">
            <div className="snippet_card_title heading" style={{background: "url("+story.image+")"}}>
                {story.title}
            </div>
            <div className="snippet_card_summary story_text_container">
                <h2 className="secondary_heading">
                    Summary
                </h2>
                <p className="story_text">
                    {story.summary}
                </p>
            </div>
            <div className="snippet_card_metadata">
                <SourceButton story={story} />
                <DiscussionButton user={user} story={story} />
                <LikeStoryButton user={user} story={story} />
            </div>
        </div>
    )
}

// SNIPPET TITLE CARD
async function SnippetTitleCard(
    { snippet }: 
    { snippet: Snippet }
) {
    return (
        <div key="starter" className="snippet_card_expanded">
            <div className="snippet_card_title heading" style={{background: "url("+snippet.thumbnail+")"}}>
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
    )
}

// SNIPPET TITLE CARD
async function SnippetEndCard(
    { snippet }: 
    { snippet: Snippet }
) {
    return (
        <div key="starter" className="snippet_card_expanded snippet_end_card_container">
            <div className="snippet_end_card">
                <BadgeCheck size={150} />
                Thank you for reading this snippet!
                <SnippetFeedbackCard snippet={JSON.parse(JSON.stringify(snippet))} />
            </div>
        </div>
    )
}

export {
    SnippetTitleCard, 
    SnippetExpandedCard,
    SnippetEndCard
}