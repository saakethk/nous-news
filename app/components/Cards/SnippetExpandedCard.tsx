
import { Story, User } from "@/firebase/database_types";
import { LikeStoryButton, DiscussionButton } from "../Buttons/StoryButtonsClient";
import { SourceButton } from "../Buttons/StoryButtonsServer";

export default function SnippetExpandedCard({ user, story }: { user: User, story: Story }) {
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
                <DiscussionButton user={user} story={story} />
                <LikeStoryButton user={user} story={story} />
            </div>
        </div>
    )
}