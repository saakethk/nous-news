
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import { SnippetEndCard, SnippetExpandedCard, SnippetTitleCard } from "../Cards/ExpandedStoryCard";
import { Snippet, User, Story } from "@/firebase/database_types";

// SNIPPET CONTAINER COMPONENT
export default async function SnippetContainer(
    { snippet, stories, user }:
    { snippet: Snippet, stories: Story[], user: User }
) {
    return (
        <div className="total_snippet_card_container">
            <div className="snippet_card_container">
                <SnippetTitleCard snippet={JSON.parse(JSON.stringify(snippet))} />
                {stories.map((story) => (
                    <SnippetExpandedCard 
                    key={story.id} 
                    user={JSON.parse(JSON.stringify(user))} 
                    story={JSON.parse(JSON.stringify(story))} 
                    />
                ))}
                <SnippetEndCard snippet={JSON.parse(JSON.stringify(snippet))} />
            </div>
        </div>
    )
}