import { Story } from "@/firebase/database_types";
import { LikeStoryButton, DiscussionButton, SourceButton } from "../Buttons/StoryButtons";

export default function SnippetExpandedCard({user_id, story}: {user_id: string, story: Story}) {
    return (
        <div key={story.id} className="snippet_card_expanded">
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
                <DiscussionButton user_id={user_id} story={story} />
                <LikeStoryButton user_id={user_id} story={story} />
            </div>
        </div>
    )
}