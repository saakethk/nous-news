
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import SourceCard from "@/app/components/Cards/SourceCard";
import StoryCard from "@/app/components/Cards/StoryCard";
import TrendingStories from "@/app/components/Carousels/TrendingStories";
import { getAllSources, getAllCategories, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

function capitalizeFirstLetter(phrase: string) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

export default async function News() {

    const clerk_user = await currentUser();
    const user = await getUser(clerk_user!.id);
    const {sources, sources_w_stories} = await getAllSources(false);
    const {categories, categories_w_stories} = await getAllCategories(true);

    return (
        <>
            <SideBar />
            <ContentContainer heading="News">
                <TrendingStories />
                <CardContainer key="sources" heading="Sources" description="Verified sources you can follow">
                    {sources.map((source) => (
                        <SourceCard key={source.id} source={JSON.parse(JSON.stringify(source))} user={user} />
                    ))}
                </CardContainer>
                {categories_w_stories.map((category) => (
                    <CardContainer key={category.name} heading={capitalizeFirstLetter(category.name)} description={"Stories in category of "+category.name}>
                        {category.stories.map((story) => (
                            <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                        ))}
                    </CardContainer>                
                ))}
            </ContentContainer>
        </>
    )
}