
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import StoryCarousel from "./components/Carousels/StoryCarousel";
import SnippetCard from "./components/Cards/SnippetCard";
import StoryCard from "./components/Cards/StoryCard";
import { getAllSnippets, getAllStories, getUserFollowedStories, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    const stories = await getAllStories();
    const snippets = await getAllSnippets();
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
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                    ))}
                </CardContainer>
            </ContentContainer>
        </>
    )
}
