
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import ReplyCard from "../Cards/ReplyCard";
import { Comment, User } from "@/firebase/database_types";

// REPLIES CONTAINER COMPONENT - Gets replies given a comment
export default async function RepliesContainer(
    { replies, user }:
    { replies: Comment[], user: User }
) {
    return (
        <div className="replies_container">
            {replies.map((reply) => (
                <ReplyCard key={reply.id} comment={JSON.parse(JSON.stringify(reply))} user={JSON.parse(JSON.stringify(user))} />
            ))}
        </div>
    )
}