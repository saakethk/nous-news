
"use client";

import { useState } from "react";
import { Discussion, User } from "@/firebase/database_types";
import { createComment } from "@/firebase/helper";
import { usePathname, useRouter } from "next/navigation";
import { PostModal, SuccessModal } from "./PostModal";

export default function CommentModal({ user, discussion, isOpen, onOpenChange}: {user: User, discussion: Discussion, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    
    const router = useRouter();
    const pathname = usePathname();
    const [commentText, setCommentText] = useState("");
    const [posted, setPosted] = useState(false);

    const publishComment = async () => {
        const post_response = await createComment(user, discussion, commentText);
        setPosted(post_response.success);
    };

    const resetHandler = () => {
        setPosted(false);
        setCommentText("");
        if (pathname == "/discussion/"+discussion.id) {
            router.refresh();
        } else {
            router.push("/discussion/"+discussion.id);
        }
    };
     
    if (posted) {
        return (
            <SuccessModal 
            title="Comment" 
            success_message="Your comment has been shared with the Nous community."
            post_text={commentText} 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            reset={resetHandler}
            />
        )
    }
    else {
        return (
            <PostModal
            title="Comment"
            text_placeholder="Share your thoughts with others..."
            text_limit={500}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            post_text={commentText}
            setPostText={setCommentText}
            publishPost={publishComment}
            />
        )
    }

}