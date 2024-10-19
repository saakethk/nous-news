
import SideBar from "@/app/components/General/SideBar";
import ContentContainer from "@/app/components/General/ContentContainer";
import CardContainer from "@/app/components/General/CardContainer";
import SourceCard from "@/app/components/Cards/SourceCard";
import StoryCard from "@/app/components/Cards/StoryCard";
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
            <ContentContainer heading="News" subheading="Browse the latest news summaries from around the world">
                <CardContainer key="sources" heading="Sources">
                    {sources.map((source) => (
                        <SourceCard key={source.id} source={JSON.parse(JSON.stringify(source))} user={user} />
                    ))}
                </CardContainer>
                {categories_w_stories.map((category) => (
                    <CardContainer key={category.name} heading={capitalizeFirstLetter(category.name)}>
                        {category.stories.map((story) => (
                            <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                        ))}
                    </CardContainer>                
                ))}
            </ContentContainer>
        </>
    )
}