
import { Link } from "@nextui-org/react";

export default function StoryNavBar() {
    return (
        <div className="discussions_selection_header">
            <Link className="discussions_selection_tab" href="/discussions/trending">
                Trending
            </Link>
            <Link className="discussions_selection_tab" href="/discussions/most_liked">
                Most Liked
            </Link>
            <Link className="discussions_selection_tab" href="/discussions/most_discussed">
                Most Discussed
            </Link>
            <Link className="discussions_selection_tab" href="/discussions/new">
                New
            </Link>
            <Link className="discussions_selection_tab" href="/discussions/old"> 
                Old
            </Link>
        </div>
    )
}