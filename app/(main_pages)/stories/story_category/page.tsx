

import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import DiscussionsContainer from "@/app/components/Containers/DiscussionsContainer";
import DiscussionNavBar from "@/app/components/Navigation/CategoryNavBar";
import { where, Timestamp, orderBy, QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint } from "@firebase/firestore";

export default async function DiscussionsPage(
    { params }: { params: { discussion_category: string } }
) {

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const filters: { [key: string]: { filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] } } = {
        "trending": {
            filters: [where("date_created", ">", Timestamp.fromDate(currentDate))]
        },
        "most_liked": {
            filters: [orderBy("likes", "desc")]
        },
        "most_discussed": {
            filters: [orderBy("num_comments", "desc")]
        },
        "new": {
            filters: [orderBy("date_created", "desc")]
        },
        "old": {
            filters: [orderBy("date_created")]
        }
    };

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions">
                <DiscussionNavBar filters={} />
                <DiscussionsContainer sort_by={filters[params.discussion_category].filters} />
            </ContentContainer>
        </>
    )
}