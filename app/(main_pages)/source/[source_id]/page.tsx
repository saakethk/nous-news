
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardPaginatedContainer from "@/app/components/Containers/CardPaginatedContainer";
import SourceHeader from "@/app/components/Other/SourceHeader";
import { getSource, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

// NEWS SOURCES PAGE
export default async function NewsSources(
    { params }: { 
        params: Promise<{ source_id: string }> 
    }
) {

    // Gets snippet id
    const source_id = (await params).source_id;

    // Gets user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Gets snippet and its stories
    const { source } = await getSource(source_id, false);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading={source.name}>
                <SourceHeader 
                user={JSON.parse(JSON.stringify(user))} 
                source={JSON.parse(JSON.stringify(source))} 
                />
                <CardPaginatedContainer heading="All Stories" description={"All Stories posted by "+source.name} ids={source.stories} type="stories" user={user} />
            </ContentContainer>
        </>
    )
}