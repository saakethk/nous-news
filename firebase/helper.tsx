
import ShortUniqueId from 'short-unique-id';
import { db } from "./config";
import { Story, Snippet, User, Source, Discussion, Comment, Category } from "./database_types";
import { doc, setDoc, getDoc, Timestamp, getDocs, collection } from "firebase/firestore";


// Generates unique id for creating objects
function generateID() {

    const { randomUUID } = new ShortUniqueId({ length: 22 });

    return randomUUID();

}

// Gets username of person by getting unique part of email
function getUsername(user: User) {

  return "@"+user.email.substring(0, user.email.indexOf("@"));

}

// Converts Firebase Timestamp type into Typescript Date
function convertTimestampToDate(timestamp: Timestamp): Date {

    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

}

// Gets number of days given a timestamp to current date
function getNumDays(timestamp: Timestamp) {

  const pastDate = convertTimestampToDate(timestamp);
  const currentDate = new Date();
  const differenceInMs: number = Math.abs(currentDate.getTime() - pastDate.getTime());
  const millisecondsInHours: number = 1000 * 60 * 60;
  const differenceInHours: number = Math.floor(differenceInMs / millisecondsInHours)
  const millisecondsInDay: number = millisecondsInHours * 24;
  const differenceInDays: number = Math.floor(differenceInMs / millisecondsInDay);
  
  if (differenceInDays == 0) {
      return "Today (" + differenceInHours + " hours ago)";
  } else if (differenceInDays == 1) {
      return "1 day ago";
  } else {
      return differenceInDays + " days ago";
  }

}

// Gets user
async function getUser(user_id: string) {

    const userRef = doc(db, "users", user_id);
    const userSnap = await getDoc(userRef);

    return userSnap.data() as User;

}

// Gets story
async function getStory(story_id: string) {

    const storyRef = doc(db, "stories", story_id);
    const storySnap = await getDoc(storyRef);

    return storySnap.data() as Story;

}

// Gets multiple stories
async function getStories(story_ids: string[]) {

    const stories: Story[] = [];

    for (const story_id of story_ids) {
        const story = await getStory(story_id);
        stories.push(story);
    }
    
    return stories;

}

// Gets snippet
async function getSnippet(snippet_id: string) {

    const snippetRef = doc(db, "snippets", snippet_id);
    const snippetSnap = await getDoc(snippetRef);

    return snippetSnap.data() as Snippet;

}

// Gets all snippets
async function getAllSnippets() {

    const snippets: Snippet[] = [];
    const snippetsRef = collection(db, "snippets");
    const querySnapshot = await getDocs(snippetsRef);

    querySnapshot.forEach((doc) => {
        snippets.push(doc.data() as Snippet);
    });

    return snippets;

}

// Gets related stories based on the snippet that a story is associated with
async function getRelatedStories(current_story_id: string, snippet_association: string) {

    const associated_snippet = await getSnippet(snippet_association);
    const story_ids = associated_snippet.stories.filter((id) => id !== current_story_id);
    
    return getStories(story_ids);

}

// Gets source and if needed the associated stories
async function getSource(source_id: string, get_stories: boolean = false) {

    const associated_stories: Story[] = []
    const sourceRef = doc(db, "sources", source_id);
    const sourceSnapshot = await getDoc(sourceRef);
    const source = sourceSnapshot.data() as Source;

    if (get_stories) {

        for (const story_id of source.stories) {
            associated_stories.push(await getStory(story_id))
        }

        return {
            source: source,
            stories: associated_stories
        }

    } else {

        return {
            source: source,
            stories: associated_stories
        }

    }

}

// Gets all sources and if needed the associated stories
async function getAllSources(get_stories: boolean = false) {

    const sources: Source[] = [];
    const sourcesRef = collection(db, "sources");
    const querySnapshot = await getDocs(sourcesRef);

    querySnapshot.forEach((doc) => {
        sources.push(doc.data() as Source);
    });

    const sources_w_stories: Array<{name: string, stories: Array<Story>}> = [];

    if (get_stories) {

        for (const source of sources) {

            const stories: Array<Story> = [];

            for (const story_id of source.stories) {
                stories.push(await getStory(story_id));
            }

            sources_w_stories.push({
                name: source.name,
                stories: stories
            })

        }

        return {
            sources: sources,
            sources_w_stories: sources_w_stories
        };
  
    } else {

        return {
            sources: sources,
            sources_w_stories: sources_w_stories
        };

    }

}

// Gets all categories and if needed the associated stories
async function getAllCategories(get_stories: boolean = false) {

  const categories: Category[] = [];
  const categoriesRef = collection(db, "categories");
  const querySnapshot = await getDocs(categoriesRef);

  querySnapshot.forEach((doc) => {
      categories.push(doc.data() as Source);
  });

  const categories_w_stories: Array<{name: string, stories: Array<Story>}> = [];

  if (get_stories) {

      for (const category of categories) {

          const stories: Array<Story> = [];

          for (const story_id of category.stories) {
              stories.push(await getStory(story_id));
          }
          
          if (stories.length != 0) {
              categories_w_stories.push({
                  name: category.name,
                  stories: stories
              })
          }

      }

      return {
          categories: categories,
          categories_w_stories: categories_w_stories
      };

  } else {

      return {
          categories: categories,
          categories_w_stories: categories_w_stories
      };

  }

}

// Check if user liked story already
async function checkLikesStory(user: User, story: Story) {

    if (user.liked.includes(story.id)) {
        return true;
    }
    else {
        return false;
    }

}

// Updates like on story and user
async function likeStory(user: User, story: Story) {
    
    const storyRef = doc(db, "stories", story.id);
    const userRef = doc(db, "users", user.id);
    user.liked.push(story.id);
    
    try {

        await setDoc(storyRef, { likes: story.likes + 1 }, { merge: true });
        await setDoc(userRef, { liked: user.liked}, { merge: true });

        return {
            success: true,
            likes: story.likes + 1
        }

    } catch (error) {

        return {
            success: false,
            likes: story.likes
        }

    }

}

// Check if user liked story already
async function checkFollowSource(user: User, source: Source) {

  if (user.following.includes(source.id)) {
      return true;
  }
  else {
      return false;
  }

}

// Updates like on story and user
async function followSource(user: User, source: Source) {
  
  const sourceRef = doc(db, "sources", source.id);
  const userRef = doc(db, "users", user.id);
  user.following.push(source.id);
  
  try {

      await setDoc(sourceRef, { follows: source.follows + 1 }, { merge: true });
      await setDoc(userRef, { following: user.following}, { merge: true });

      return {
          success: true,
          follows: source.follows + 1
      }

  } catch (error) {

      return {
          success: false,
          follows: source.follows
      }

  }

}

// Gets discussion
async function getDiscussion(discussion_id: string) {

    const discussionRef = doc(db, "discussions", discussion_id);
    const discussionSnap = await getDoc(discussionRef);

    return discussionSnap.data() as Discussion;

}

// Gets all discussions
async function getAllDiscussions() {

    const discussions: Discussion[] = [];
    const discussionsRef = collection(db, "discussions");
    const querySnapshot = await getDocs(discussionsRef);

    querySnapshot.forEach((doc) => {
        discussions.push(doc.data() as Discussion);
    });

    return discussions;

}

// Creates new discussion
async function createDiscussion(user: User, story: Story, text_content: string) {
    
    const discussionId = generateID();
    const discussionRef = doc(db, "discussions", discussionId);

    const storyRef = doc(db, "stories", story.id);
    story.discussions.push(discussionId);

    const userRef = doc(db, "users", user.id);
    user.discussed.push(discussionId);

    try {

        const discussion: Discussion = {
          user_association: user.id,
          id: discussionId,
          story_association: story.id,
          date_created: Timestamp.fromDate(new Date()),
          text: text_content,
          likes: 0,
          comments: []
        }
        await setDoc(discussionRef, discussion, { merge: true });
        await setDoc(userRef, { discussed: user.discussed }, { merge: true });
        await setDoc(storyRef, { discussions: story.discussions }, { merge: true })

        return {
            success: true, 
            id: discussionId
        };

    } catch (error) {

        return {
            success: false, 
            id: discussionId
        };

    }

}

// Updates like on discussion and user
async function likeDiscussion(user_id: string, discussion_id: string, current_likes: number) {
    
    const discussionRef = doc(db, "discussions", discussion_id);
    const userRef = doc(db, "users", user_id);
    const user = await getUser(user_id);
    user.liked_discussions.push(discussion_id);
    
    try {

        await setDoc(discussionRef, { likes: current_likes + 1 }, { merge: true });
        await setDoc(userRef, { liked: user.liked_discussions }, { merge: true });

        return {
            success: true,
            likes: current_likes + 1
        };

    } catch (error) {

        return {
            success: false,
            likes: current_likes
        };

    }

}

// Gets comment
async function getComment(comment_id: string) {

    const commentRef = doc(db, "comments", comment_id);
    const commentSnap = await getDoc(commentRef);

    return commentSnap.data() as Comment;

}


// Gets list of comments
async function getComments(comment_ids: Array<string>) {

    const comments: Comment[] = [];

    for (const comment_id of comment_ids) {
        comments.push(await getComment(comment_id) as Comment);
    }

    return comments.sort((a, b) => convertTimestampToDate(b.date_created).getTime() - convertTimestampToDate(a.date_created).getTime());

}

// Gets list of replies
async function getReplies(reply_ids: Array<string>) {

    const replies: Comment[] = [];

    for (const reply_id of reply_ids) {
        replies.push(await getComment(reply_id) as Comment);
    }

    return replies.sort((a, b) => convertTimestampToDate(b.date_created).getTime() - convertTimestampToDate(a.date_created).getTime());

}

// Creates new discussion
async function createComment(user: User, discussion: Discussion, text_content: string) {
    
    const commentId = generateID();
    const commentRef = doc(db, "comments", commentId);

    const discussionRef = doc(db, "discussions", discussion.id)
    discussion.comments.push(commentId)

    const userRef = doc(db, "users", user.id);
    user.comments.push(commentId);

    try {

        const comment: Comment = {
            id: commentId,
            user_association: user.id,
            discussion_association: discussion.id,
            text: text_content,
            likes: 0,
            date_created: Timestamp.fromDate(new Date()),
            replies: []
        }
        await setDoc(commentRef, comment, { merge: true });
        await setDoc(userRef, { comments: user.comments }, { merge: true });
        await setDoc(discussionRef, { comments: discussion.comments }, { merge: true });

        return {
            success: true, 
            id: commentId,
            comment: comment
        };

    } catch (error) {

        return {
            success: false, 
            id: commentId,
            comment: {} as Comment
        };

    }

}

// Creates new discussion
async function createCommentReply(user: User, comment: Comment, text_content: string) {
    
  const replyId = generateID();
  const replyRef = doc(db, "comments", replyId);

  const commentRef = doc(db, "comments", comment.id)
  comment.replies.push(replyId)

  const userRef = doc(db, "users", user.id);
  user.comments.push(replyId);

  try {

      const reply: Comment = {
          id: replyId,
          user_association: user.id,
          discussion_association: comment.discussion_association,
          text: text_content,
          likes: 0,
          date_created: Timestamp.fromDate(new Date()),
          replies: []
      }
      await setDoc(replyRef, reply, { merge: true });
      await setDoc(userRef, { comments: user.comments }, { merge: true });
      await setDoc(commentRef, { replies: comment.replies }, { merge: true });

      return {
          success: true, 
          id: replyId
      };

  } catch (error) {

      return {
          success: false, 
          id: replyId
      };

  }

}

// Updates like on comment and user
async function likeComment(user_id: string, comment_id: string, current_likes: number) {
    
    const commentRef = doc(db, "comments", comment_id);
    const userRef = doc(db, "users", user_id);
    const user = await getUser(user_id);
    user.liked_comments.push(comment_id);
    
    try {

        await setDoc(commentRef, { likes: current_likes + 1 }, { merge: true });
        await setDoc(userRef, { liked: user.liked_comments }, { merge: true });

        return {
            success: true,
            likes: current_likes + 1
        };

    } catch (error) {

        return {
            success: false,
            likes: current_likes
        };

    }

}

export { 
    convertTimestampToDate, 
    getUser,
    getStory, 
    getStories,
    getRelatedStories,
    checkLikesStory,
    likeStory,
    getSnippet, 
    getAllSnippets,
    getSource, 
    getAllSources,
    getComment,
    getComments,
    createComment,
    likeComment,
    getDiscussion,
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    getAllCategories,
    followSource,
    checkFollowSource,
    getNumDays,
    getUsername,
    createCommentReply,
    getReplies
};