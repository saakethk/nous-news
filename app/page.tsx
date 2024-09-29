import SideBar from "./components/SideBar";
import ContentContainer from "./components/ContentContainer";
import CardContainer from "./components/CardContainer";
import { Snippet } from "./(auth)/firebase/database_types";
import { db } from "./(auth)/firebase/config";
import { collection, getDocs} from "firebase/firestore";
import SnippetCard from "./components/SnippetCard";
import { convertTimestampToDate } from "./(auth)/firebase/helper";

async function getSnippets() {

  const snippets: Snippet[] = [];

  const snippets_ref = collection(db, "snippets");
  const snippets_doc = await getDocs(snippets_ref);
  for (const snippet of snippets_doc.docs) {
      snippets.push(snippet.data() as Snippet);
      // for (const story of snippet.data().stories) {
      //   const story_ref = doc(db, "stories", story);
      //   const story_doc = await getDoc(story_ref);
      // }
  }

  return snippets;
}

export default async function Home() {

  const snippets = await getSnippets();

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
