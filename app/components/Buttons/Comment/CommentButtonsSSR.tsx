
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import { Link } from "@nextui-org/react";
import { Comment } from "@/firebase/database_types";
import { Undo2 } from "lucide-react";

// RETURN BUTTON - To view context of comment
async function ReturnButton({ comment }: { comment: Comment }) {
    return (
        <Link 
        isBlock 
        showAnchorIcon 
        href={"/discussion/" + comment.discussion_association} 
        className="return_discussion" 
        anchorIcon={<Undo2 />} 
        >
            Return to discussion &nbsp;
        </Link>
    )
}

export {
    ReturnButton
}