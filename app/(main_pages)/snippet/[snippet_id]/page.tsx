
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SnippetContainer from "@/app/components/Containers/SnippetContainer";
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import { getSnippet, getStories, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

// SNIPPET PAGE
export default async function SnippetPage(
    { params }: { 
        params: Promise<{ snippet_id: string }>
    }
) {

    // Gets snippet id
    const snippet_id = (await params).snippet_id;

    // Gets user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Gets snippet and its stories
    const snippet = await getSnippet(snippet_id);
    const stories = await getStories(snippet.stories);
    
    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false}>
                <SnippetContainer 
                snippet={JSON.parse(JSON.stringify(snippet))} 
                stories={JSON.parse(JSON.stringify(stories))} 
                user={JSON.parse(JSON.stringify(user))} 
                />   
            </ContentContainer>
        </>
    )
}