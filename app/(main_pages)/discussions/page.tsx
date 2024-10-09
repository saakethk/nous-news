import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import { StoryCard } from "@/app/components/Cards/StoryCard";
import { getDiscussions } from "@/firebase/helper";
import DiscussionCard from "@/app/components/Cards/DiscussionCard";

export default async function DiscussionsPage() {

    const discussions = await getDiscussions();

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions" subheading="Browse insightful news discussions...">
                <CardContainer heading={"All Discussions"}>
                    {discussions.map((discussion) => (
                        <DiscussionCard discussion={JSON.parse(JSON.stringify(discussion))} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}