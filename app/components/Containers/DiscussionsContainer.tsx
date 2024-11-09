
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import DiscussionCard from "../Cards/DiscussionCard";
import { getAllDiscussions } from "@/firebase/helper";
import { QueryLimitConstraint, QueryFieldFilterConstraint, QueryOrderByConstraint } from "@firebase/firestore";

// DISCUSSIONS CONTAINER
export default async function DiscussionsContainer(
    { sort_by }: 
    { sort_by: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }
) {

    // Gets discussions which match criteria
    const discussions = await getAllDiscussions(sort_by);

    return (
        <div className="discussions_extended_container">
            {discussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={JSON.parse(JSON.stringify(discussion))} isAdaptable={true} />
            ))}
        </div>
    )
}