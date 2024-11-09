
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import SearchContainer from "@/app/components/Containers/SearchContainer";
import { formatTitle } from "@/firebase/helper";

// SEARCH PAGE
export default async function StoriesPage(
    { params }: { 
        params: Promise<{ search_category: string }>
    }
) {

    // Gets search category
    const search_category = (await params).search_category;

    return (
        <>
            <SideBar />
            <ContentContainer heading={"Search for "+formatTitle(search_category)} hassearch={true} searchtype="stories">
                <SearchContainer type={search_category} />
            </ContentContainer>
        </>
    )
}