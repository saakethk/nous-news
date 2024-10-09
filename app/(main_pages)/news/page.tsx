
import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import SourceCard from "@/app/components/Cards/SourceCard";
import { StoryCard } from "@/app/components/Cards/StoryCard";
import { getAllSources } from "@/firebase/helper";


export default async function News() {

    const {sources, sources_w_stories} = await getAllSources(true);

    return (
        <>
            <SideBar />
            <ContentContainer heading="News" subheading="Browse the latest news summaries from around the world">
                <CardContainer key="sources" heading="Sources">
                    {sources.map((source) => (
                        <SourceCard key={source.name} source={source.name} image_url={source.image} num_stories={source.num_stories} />
                    ))}
                </CardContainer>
                {sources_w_stories.map((source) => (
                    <CardContainer key={source.name} heading={source.name}>
                        {source.stories.map((story) => (
                            <StoryCard key={story.id} id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                        ))}
                    </CardContainer>                
                ))}
            </ContentContainer>
        </>
    )
}