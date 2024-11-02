
import { Button, Link } from "@nextui-org/react";
import { getAllStories } from "@/firebase/helper";

export default async function TrendingStories() {

    const stories = await getAllStories(true);
    const arrayRange = Array.from({ length: 7 }, (value, index) => index+1);

    return (
        <div className="trending_stories_container">
            <div className="trending_stories">
                <h1 className="card_container_heading">
                    Trending 🔥
                </h1>
                <div className="trending_stories_grid">
                    {arrayRange.map((story_id) => (
                        <Button key={stories[story_id].id} className="trending_stories_item"  as={Link} href={"/news/"+stories[story_id].id}>
                            <div className="trending_stories_text">
                                {story_id}. {stories[story_id].title}
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}