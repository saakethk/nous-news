
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import { StoryCard } from "../Cards/StoryCard";
import { getAllStories } from "@/firebase/helper";
import { QueryLimitConstraint, QueryFieldFilterConstraint, QueryOrderByConstraint } from "@firebase/firestore";

// STORIES CONTAINER
export default async function StoriesContainer(
    { sort_by }: 
    { sort_by: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }
) {

    // Gets all stories with filters specified
    const stories = await getAllStories(sort_by);

    return (
        <div className="discussions_extended_container">
            {stories.map((story) => (
                <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
            ))}
        </div>
    )
}