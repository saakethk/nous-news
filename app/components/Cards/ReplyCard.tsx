
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import CommentCard from "./CommentCard";
import { Comment, User } from "@/firebase/database_types";

// REPLY CARD COMPONENT
export default async function ReplyCard(
    { comment, user }: 
    { comment: Comment, user: User }
) {
    return (
        <div className="reply_card_container">
            <div className="reply_card">
                <CommentCard comment={JSON.parse(JSON.stringify(comment))} user={JSON.parse(JSON.stringify(user))} />
            </div>
        </div>
    )
}