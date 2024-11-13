
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use server";

// IMPORTS
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import StoryCarousel from "./components/Other/StoryCarousel";
import { SnippetCard } from "./components/Cards/SnippetCard";
import { StoryCard } from "./components/Cards/StoryCard";
import { getAllSnippets, getAllStories, getUserFollowedStories, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";
import { Filter, Story } from "@/firebase/database_types";

// HOME PAGE
export default async function Home() {

    // Retrieves user
    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);

    // Retrieves stories
    const storyFilter: Filter = {
        link: "new",
        name: "New",
        order: {
            key: "date_added",
            direction: "desc"
        }
    }
    const stories = await getAllStories(storyFilter, {} as Story, 10);

    // Retrieves snippets
    const snippets = await getAllSnippets();

    // Retrieves stories followed by user
    const followed_stories = await getUserFollowedStories(user);

    return (
        <>
            <SideBar />
            <ContentContainer heading="Home">
                <StoryCarousel stories={JSON.parse(JSON.stringify(stories))} />
                <CardContainer heading="Snippets" description="Playlists of stories curated for you">
                    {snippets.map((snippet) => (
                        <SnippetCard key={snippet.id} snippet={JSON.parse(JSON.stringify(snippet))} />
                    ))}
                </CardContainer>
                <CardContainer heading="Following" description="Recent stories from sources you follow">
                    {followed_stories.map((story) => (
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} isAdaptable={false} />
                    ))}
                </CardContainer>
            </ContentContainer>
        </>
    )
}
