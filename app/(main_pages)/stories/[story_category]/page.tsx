
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import StoriesContainer from "@/app/components/Containers/StoriesContainer";
import CategoryNavBar from "@/app/components/Navigation/CategoryNavBar";
import { where, orderBy, QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint } from "@firebase/firestore";
import { getAllCategories } from "@/firebase/helper";

// STORIES PAGE
export default async function StoriesPage(
    { params }: { 
        params: Promise<{ story_category: string }>
    }
) {

    // Gets story category
    const story_category = (await params).story_category;

    // Gets relevant date cutoff
    const relevantDate = new Date();
    relevantDate.setDate(relevantDate.getDate() - 1);
 
     // Gets the filters associated with stories
    const filters: { link: string, name: string, filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }[] = [
        {
            link: "most_liked",
            name: "Most Liked",
            filters: [orderBy("likes", "desc")]
        },
        {
            link: "most_discussed",
            name: "Most Discussed",
            filters: [orderBy("num_discussions", "desc")]
        },
        {
            link: "new",
            name: "New",
            filters: [orderBy("date_added", "desc")]
        },
        {
            link: "old",
            name: "Old",
            filters: [orderBy("date_added")]
        }
    ];

    // Adds category filters
    const categories = await getAllCategories();
    for (const category of categories.categories) {
        filters.unshift(
            {
                link: category.name,
                name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                filters: [orderBy("date_added", "desc"), where("category", "==", category.id)]
            }
        )
    }

    // Chooses filters associated with story category chosen
    const chosen_filters = filters[filters.findIndex((obj) => obj.link === story_category)].filters;

    return (
        <>
            <SideBar />
            <ContentContainer heading="Stories" hassearch={true} searchtype="stories">
                <CategoryNavBar filters={filters} collection_name="stories" />
                <StoriesContainer sort_by={chosen_filters} />
            </ContentContainer>
        </>
    )
}