
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import { Link } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { Story } from "@/firebase/database_types";
import { getSource, truncateText } from "@/firebase/helper";

// RELATED STORIES SOURCE BUTTON - Links to nous account page of source
async function RelatedStoriesSourceButton({ story }: { story: Story }) {

  // Retrieves source associated with story
  const { source } = await getSource(story.source);

  return (
      <Link className="story_text_metadata_item" href={"/source/"+source.id}>
          {truncateText(source.name, 8)} &nbsp; <ArrowRight />
      </Link>
  )
}

export { 
  RelatedStoriesSourceButton 
}