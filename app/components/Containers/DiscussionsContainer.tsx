
import { getAllDiscussions } from "@/firebase/helper";
import { QueryLimitConstraint, QueryFieldFilterConstraint, QueryOrderByConstraint } from "@firebase/firestore";
import DiscussionCard from "../Cards/DiscussionCard";

export default async function DiscussionsContainer({ sort_by }: { sort_by: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }) {

    const discussions = await getAllDiscussions(sort_by);

    return (
        <div className="discussions_extended_container">
            {discussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={JSON.parse(JSON.stringify(discussion))} />
            ))}
        </div>
    )
}