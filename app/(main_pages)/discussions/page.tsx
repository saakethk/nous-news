
import SideBar from "@/app/components/General/SideBar";
import ContentContainer from "@/app/components/General/ContentContainer";
import CardContainer from "@/app/components/General/CardContainer";
import DiscussionCard from "@/app/components/Cards/DiscussionCard";
import { getAllDiscussions, getUser } from "@/firebase/helper";
import { currentUser } from "@clerk/nextjs/server";

export default async function DiscussionsPage() {

    const discussions = await getAllDiscussions();

    return (
        <>
            <SideBar />
            <ContentContainer heading="Discussions" subheading="Browse insightful news discussions...">
                <CardContainer heading={"All Discussions"}>
                    {discussions.map((discussion) => (
                        <DiscussionCard key={discussion.id} discussion={JSON.parse(JSON.stringify(discussion))} />
                    ))}
                </CardContainer> 
            </ContentContainer>
        </>
    )
}