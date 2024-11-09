
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use client";

// IMPORTS
import { Link } from "@nextui-org/react";
import { Discussion, Story } from "@/firebase/database_types";
import { MessageCircle, ThumbsUp } from "lucide-react";

// DISCUSSION SEARCH CARD COMPONENT
function DiscussionCardSearch({ discussion }: { discussion: Discussion }) {
    return (
        <Link href={"/discussion/"+discussion.id}>
            <div className="hit_component">
                <div className="primary_hit_content">
                    {discussion.text}
                </div>
                <div className="secondary_hit_content">
                    <div>
                        {discussion.num_comments}
                        <MessageCircle size={18} />
                    </div>
                    <div>
                        {discussion.likes}
                        <ThumbsUp size={18} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

// STORY SEARCH CARD COMPONENT
function StoryCardSearch({ story }: { story: Story }) {
    return (
        <Link href={"/story/"+story.id}>
            <div className="hit_component">
                <div className="primary_hit_content">
                    {story.title}
                </div>
                <div className="secondary_hit_content">
                    <div>
                        {story.discussions.length}
                        <MessageCircle size={18} />
                    </div>
                    <div>
                        {story.likes}
                        <ThumbsUp size={18} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export {
    StoryCardSearch,
    DiscussionCardSearch
}
