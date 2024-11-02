

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

    const filters: { link: string, name: string, filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }[] = [
        {
            link: "trending",
            name: "Trending",
            filters: [where("date_created", ">", Timestamp.fromDate(currentDate))]
        },
        {
            link: "most_liked",
            name: "Most Liked",
            filters: [orderBy("likes", "desc")]
        },
        {
            link: "most_discussed",
            name: "Most Discussed",
            filters: [orderBy("num_comments", "desc")]
        },
        {
            link: "new",
            name: "New",
            filters: [orderBy("date_created", "desc")]
        },
        {
            link: "old",
            name: "Old",
            filters: [orderBy("date_created")]
        }
    ];

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions">
                <DiscussionNavBar filters={filters} />
                <DiscussionsContainer sort_by={filters[filters.findIndex((obj) => obj.link === params.discussion_category)].filters} />
            </ContentContainer>
        </>
    )
}