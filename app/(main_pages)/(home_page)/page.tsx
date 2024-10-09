
import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import CardContainer from "@/app/components/CardContainer";
import SnippetCard from "@/app/components/Cards/SnippetCard";
import { convertTimestampToDate } from "@/firebase/helper";
import { getAllSnippets } from "@/firebase/helper";

export default async function Home() {

  const snippets = await getAllSnippets();

  return (
    <>
      <SideBar />
      <ContentContainer heading="Welcome to Nous" subheading="The future of news is here">
        <CardContainer heading="Snippets">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} id={snippet.id} headline={convertTimestampToDate(snippet.date_created).toDateString()} image_url={snippet.thumbnail} />
          ))}
        </CardContainer>
      </ContentContainer>
    </>
  )
}
