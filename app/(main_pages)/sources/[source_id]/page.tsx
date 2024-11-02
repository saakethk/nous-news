
import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import CardContainer from "@/app/components/Containers/CardContainer";
import SourceHeader from "@/app/components/Headers/SourceHeader";
import StoryCard from "@/app/components/Cards/StoryCard";
import { getSource, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

export default async function NewsSources(
    { params }: { params: { source_id: string } }
) {

    const clerk_user = await currentUser()
    const user = await getUser(clerk_user!.id);
    const { source, stories } = await getSource(params.source_id, true);

    return (
        <>
            <SideBar />
            <ContentContainer hasheader={false} heading={source.name} subheading={source.num_stories+" stories"}>
                <SourceHeader user={JSON.parse(JSON.stringify(user))} source={JSON.parse(JSON.stringify(source))} />
                <CardContainer heading={"News from "+source.name}>
                    {stories.map((story) => (
                        <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}