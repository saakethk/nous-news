
"use client";

import { useState } from "react";
import { Comment, User } from "@/firebase/database_types";
import { createCommentReply } from "@/firebase/helper";
import { useRouter } from "next/navigation";
import { SuccessModal, PostModal } from "./PostModal";

export default function ReplyModal({ user, comment, isOpen, onOpenChange}: {user: User, comment: Comment, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    
    const router = useRouter();
    const [replyText, setReplyText] = useState("");
    const [posted, setPosted] = useState(false);

    const publishReply = async () => {
        const post_response = await createCommentReply(user, comment, replyText)
        setPosted(post_response.success);
    };

    const resetHandler = async () => {
        setPosted(false);
        setReplyText("");
        router.refresh();
    }
     
    if (posted) {
        return (
            <SuccessModal 
            title="Reply" 
            success_message="Your comment reply has been shared with the Nous community."
            post_text={replyText} 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            reset={resetHandler}
            />
        )
    }
    else {
        return (
          <PostModal
          title="Reply"
          text_placeholder="Respond to a fellow Nous user..."
          text_limit={500}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          post_text={replyText}
          setPostText={setReplyText}
          publishPost={publishReply}
          />
        )
    }

}