
"use client";

import CommentModal from "../Modals/CommentModal";
import ReplyModal from "../Modals/ReplyModal";
import { Discussion, User, Comment } from "@/firebase/database_types";
import { useDisclosure, Button } from "@nextui-org/react";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

// Button for creating comments
function CommentButton({ user, discussion }: { user: User, discussion: Discussion }) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
      <>
          <Button onPress={onOpen} color="primary" variant="solid" className="comment_post_button" endContent={<MessageSquarePlus />}>
              Comment
          </Button>
          <CommentModal user={user} onOpenChange={onOpenChange} isOpen={isOpen} discussion={discussion} />
      </>
  )
}

// Button for creating comment replies
function CommentReplyButton({ user, comment }: { user: User, comment: Comment }) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
      <>
          <Button onPress={onOpen} className="comment_reply_button">
              Reply
          </Button>
          <ReplyModal user={user} comment={JSON.parse(JSON.stringify(comment))} onOpenChange={onOpenChange} isOpen={isOpen} />
      </>
  )
}

// Button for creating comment replies
function CommentViewRepliesButton({ comment }: { comment: Comment }) {

  const router = useRouter();

  return (
      <Button className="comment_reply_button" onPress={() => router.push("/comments/"+comment.id)}>
          View Replies
      </Button>
  )
}

export { CommentButton, CommentReplyButton, CommentViewRepliesButton };
