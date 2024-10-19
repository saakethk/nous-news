
import { Link } from "@nextui-org/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Story, Source } from "@/firebase/database_types";
import { getSource } from "@/firebase/helper";

// Button for reading source
function SourceButton({ story }: { story: Story }) {
  return (
      <Link className="story_text_metadata_item" href={story.link}>
          Source &nbsp; <ExternalLink />
      </Link>
  )
}

async function RelatedStoriesSourceButton({ story }: { story: Story }) {

  const { source, stories } = await getSource(story.source);

  return (
      <Link className="story_text_metadata_item" href={"/sources/"+source.id}>
          {source.name} &nbsp; <ArrowRight />
      </Link>
  )
}

export { SourceButton, RelatedStoriesSourceButton };