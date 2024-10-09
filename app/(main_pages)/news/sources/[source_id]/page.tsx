
import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import { StoryCard } from "@/app/components/Cards/StoryCard";
import { getSource } from "@/firebase/helper";

export default async function NewsSources(
    { params }: { params: { source_id: string } }
) {

    const source_id = params.source_id.split('%20').join(' ');
    const { source, stories } = await getSource(source_id, true);

    return (
        <>
            <SideBar />
            <ContentContainer heading={source.name} subheading={source.num_stories+" stories"}>
                <CardContainer heading={"News from "+source.name}>
                    {stories.map((story) => (
                        <StoryCard key={story.id} id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}