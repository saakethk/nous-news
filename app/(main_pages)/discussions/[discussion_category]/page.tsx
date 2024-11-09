
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import DiscussionsContainer from "@/app/components/Containers/DiscussionsContainer";
import CategoryNavBar from "@/app/components/Navigation/CategoryNavBar";
import { where, Timestamp, orderBy, QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint } from "@firebase/firestore";

// DISCUSSIONS PAGE
export default async function DiscussionsPage(
    { params }: { 
        params: Promise<{ discussion_category: string }> 
    }
) {

    // Gets discussion category
    const discussion_category = (await params).discussion_category;

    // Gets relevant date cutoff
    const relevantDate = new Date();
    relevantDate.setDate(relevantDate.getDate() - 1);

    // Gets the filters associated with 
    const filters: { link: string, name: string, filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }[] = [
        {
            link: "trending",
            name: "Trending",
            filters: [where("date_created", ">", Timestamp.fromDate(relevantDate))]
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

    // Chooses filters associated with discussion category chosen
    const chosen_filters = filters[filters.findIndex((obj) => obj.link === discussion_category)].filters;

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions">
                <CategoryNavBar filters={filters} collection_name="discussions" />
                <DiscussionsContainer sort_by={chosen_filters} />
            </ContentContainer>
        </>
    )
}