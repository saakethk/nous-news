
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import StoriesContainer from "@/app/components/Containers/StoriesContainer";
import CategoryNavBar from "@/app/components/Navigation/CategoryNavBar";
import { getAllCategories } from "@/firebase/helper";
import { Filter } from "@/firebase/database_types";

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
    const filters: Filter[] = [
        {
            link: "trending",
            name: "Trending",
            order: {
                key: "likes",
                direction: "desc"
            },
            where_filter: relevantDate
        },
        {
            link: "most_liked",
            name: "Most Liked",
            order: {
                key: "likes",
                direction: "desc"
            }
        },
        {
            link: "most_discussed",
            name: "Most Discussed",
            order: {
                key: "num_discussions",
                direction: "desc"
            }
        },
        {
            link: "new",
            name: "New",
            order: {
                key: "date_added",
                direction: "desc"
            }
        },
        {
            link: "old",
            name: "Old",
            order: {
                key: "date_added",
                direction: "asc"
            }
        }
    ];

    // Adds category filters
    const categories = await getAllCategories();
    for (const category of categories.categories) {
        if (category.stories.length != 0) {
            filters.unshift(
                {
                    link: category.name,
                    name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                    order: {
                        key: "date_added",
                        direction: "desc"
                    },
                    where_filter: category.id
                }
            )
        }
    }

    // Chooses filters associated with story category chosen
    const chosen_filters = filters[filters.findIndex((obj) => obj.link === story_category)];
    return (
        <>
            <SideBar />
            <ContentContainer heading="Stories" hassearch={true} searchtype="stories">
                <CategoryNavBar filters={filters} collection_name="stories" />
                <StoriesContainer filter={JSON.parse(JSON.stringify(chosen_filters))} />
            </ContentContainer>
        </>
    )
}