
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import SnippetBriefContainer from "./components/Containers/SnippetBriefContainer";
import { SnippetCard } from "./components/Cards/SnippetCard";
import { StoryCard } from "./components/Cards/StoryCard";
import { getAllSnippets, getUserFollowedStories, getUser, updateUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { Snippet } from "@/firebase/database_types";

// HOME PAGE
export default async function Home() {

    // Retrieves user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    updateUser(user);

    // Retrieves current snippet
    const snippet = await getAllSnippets({} as Snippet, 1);

    // Retrieves stories followed by user
    const followed_stories = await getUserFollowedStories(user);

    return (
        <>
            <SideBar />
            <ContentContainer heading={"Welcome "+user.name}>
                <div className="snippet_card_graphic_container">
                    <div className="snippet_card_graphic">
                        <div>
                            <span>
                                <h1 className="heading">
                                    Don't have time to browse?
                                </h1>
                                <p>
                                    Read this daily snippet curated by our team. It has stories that cover a range of topics from finance to education.
                                </p>
                            </span>
                        </div>
                        <div>
                            <SnippetCard snippet={JSON.parse(JSON.stringify(snippet[0]))} />
                        </div>
                    </div>
                </div>
                <SnippetBriefContainer />
                <CardContainer heading="Following" description="Recent stories from sources you follow">
                    {followed_stories.map((story) => (
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} isAdaptable={false} />
                    ))}
                </CardContainer>
            </ContentContainer>
        </>
    )
}
