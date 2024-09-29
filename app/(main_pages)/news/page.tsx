import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import StoryCard from "@/app/components/StoryCard";
import { db } from "@/app/(auth)/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import SourceCard from "@/app/components/SourceCard";
import { Source, Story } from "@/app/(auth)/firebase/database_types";

async function getSources() {

    const sources: Source[] = [];

    const querySnapshot = await getDocs(collection(db, "sources"));
        querySnapshot.forEach((doc) => {
            sources.push(doc.data() as Source);
        }
    );

    return sources;
}

async function getSingleSource(source_data: Source[]) {

    const sources: Array<{name: string, stories: Array<Story>}> = [];

    for (const source of source_data) {

        const stories: Array<Story> = [];

        for (const story_id of source.stories) {
            const docRef = doc(db, "stories", story_id);
            const docSnap = await getDoc(docRef);
            stories.push(docSnap.data() as Story);
        }

        sources.push({
            "name": source.name,
            "stories": stories
        });
    }

    return sources;
}

export default async function News() {

    const source_data =  await getSources();
    const single_source_data = await getSingleSource(source_data);

    return (
        <>
            <SideBar />
            <ContentContainer heading="News" subheading="Browse the latest news summaries from around the world">
                <CardContainer heading="Sources">
                    {source_data.map((source) => (
                        <SourceCard key={source.name} source={source.name} image_url={source.image} num_stories={source.num_stories} />
                    ))}
                </CardContainer>
                {single_source_data.map((source) => (
                    <CardContainer key={source.name} heading={source.name}>
                        {source.stories.map((story) => (
                            <StoryCard key={story.id} id={story.id} headline={story.title} image_url={story.image} views={0} />
                        ))}
                    </CardContainer>                
                ))}
            </ContentContainer>
        </>
    )
}