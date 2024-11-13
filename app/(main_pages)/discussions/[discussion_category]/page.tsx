
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import DiscussionsContainer from "@/app/components/Containers/DiscussionsContainer";
import CategoryNavBar from "@/app/components/Navigation/CategoryNavBar";
import { Filter } from "@/firebase/database_types";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/firebase/helper";

// DISCUSSIONS PAGE
export default async function DiscussionsPage(
    { params }: { 
        params: Promise<{ discussion_category: string }> 
    }
) {

    // Gets discussion category
    const discussion_category = (await params).discussion_category;

    // Gets user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

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
                key: "num_comments",
                direction: "desc"
            }
        },
        {
            link: "new",
            name: "New",
            order: {
                key: "date_created",
                direction: "desc"
            }
        },
        {
            link: "old",
            name: "Old",
            order: {
                key: "date_created",
                direction: "asc"
            }
        }
    ];

    // Chooses filters associated with discussion category chosen
    const chosen_filter = filters[filters.findIndex((obj) => obj.link === discussion_category)];

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions">
                <CategoryNavBar filters={filters} collection_name="discussions" />
                <DiscussionsContainer user={user} filter={chosen_filter} />
            </ContentContainer>
        </>
    )
}