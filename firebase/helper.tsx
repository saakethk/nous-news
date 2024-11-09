
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// IMPORTS
import ShortUniqueId from 'short-unique-id';
import { db } from "./config";
import { Story, Snippet, User, Source, Discussion, Comment, Category } from "./database_types";
import { doc, setDoc, getDoc, Timestamp, getDocs, collection, query } from "firebase/firestore";
import { QueryLimitConstraint, QueryFieldFilterConstraint, QueryOrderByConstraint } from "@firebase/firestore";

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
function convertTimestampToDate(timestamp: Timestamp) {

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

// Gets phrase with cutoff defined
function formatTitle(headline: string, cutoff: number = 0) {

    if (headline != null) {
        if (cutoff != 0) {
            if (headline.length > cutoff) {
                return headline.substring(0, cutoff) + "...";
            }
            return headline;
        } else {
            return headline.charAt(0).toUpperCase() + headline.slice(1);
        }
    }

    return "";
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

// Gets all snippets
async function getAllStories(filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] = []) {

    const stories: Story[] = [];
    let storiesRef = query(collection(db, "stories"));
    switch(filters.length) {
        case 1: {
            storiesRef = query(collection(db, "stories"), filters[0]);
            break;
        }
        case 2: {
            storiesRef = query(collection(db, "stories"), filters[1]);
            break;
        }
        case 3: {
            storiesRef = query(collection(db, "stories"), filters[2]);
            break;
        }
    }
    const querySnapshot = await getDocs(storiesRef);

    querySnapshot.forEach((doc) => {
        stories.push(doc.data() as Story);
    });

    return stories;

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

// Check if user liked comment already
async function checkLikesComment(user: User, comment: Comment) {

    if (user.liked_comments.includes(comment.id)) {
        return true;
    }
    else {
        return false;
    }

}

// Check if user liked discussion already
async function checkLikesDiscussion(user: User, discussion: Discussion) {

    if (user.liked_discussions.includes(discussion.id)) {
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
        await setDoc(userRef, { liked: user.liked }, { merge: true });

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

// Updates like on comment and user
async function likeComment(user: User, comment: Comment) {
    
    const commentRef = doc(db, "comments", comment.id);
    const userRef = doc(db, "users", user.id);
    user.liked_comments.push(comment.id);
    
    try {

        await setDoc(commentRef, { likes: comment.likes + 1 }, { merge: true });
        await setDoc(userRef, { liked_comments: user.liked_comments }, { merge: true });

        return {
            success: true,
            likes: comment.likes + 1
        }

    } catch (error) {

        return {
            success: false,
            likes: comment.likes
        }

    }

}

// Updates like on comment and user
async function likeDiscussion(user: User, discussion: Discussion) {
    
    const discussionRef = doc(db, "discussions", discussion.id);
    const userRef = doc(db, "users", user.id);
    user.liked_discussions.push(discussion.id);
    
    try {

        await setDoc(discussionRef, { likes: discussion.likes + 1 }, { merge: true });
        await setDoc(userRef, { liked_discussions: user.liked_discussions }, { merge: true });

        return {
            success: true,
            likes: discussion.likes + 1
        }

    } catch (error) {

        return {
            success: false,
            likes: discussion.likes
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
async function getAllDiscussions(filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] = []) {

    const discussions: Discussion[] = [];
    let discussionsRef = query(collection(db, "discussions"));
    switch(filters.length) {
        case 1: {
            discussionsRef = query(collection(db, "discussions"), filters[0]);
            break;
        }
        case 2: {
            discussionsRef = query(collection(db, "discussions"), filters[1]);
            break;
        }
        case 3: {
            discussionsRef = query(collection(db, "discussions"), filters[2]);
            break;
        }
    }
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
          num_comments: 0,
          comments: []
        }
        await setDoc(discussionRef, discussion, { merge: true });
        await setDoc(userRef, { discussed: user.discussed }, { merge: true });
        await setDoc(storyRef, { discussions: story.discussions, num_discussions: 0 }, { merge: true })

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
            num_replies: 0,
            replies: []
        }
        await setDoc(commentRef, comment, { merge: true });
        await setDoc(userRef, { comments: user.comments }, { merge: true });
        await setDoc(discussionRef, { comments: discussion.comments, num_comments: discussion.comments.length }, { merge: true });

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
          num_replies: 0,
          replies: []
      }
      await setDoc(replyRef, reply, { merge: true });
      await setDoc(userRef, { comments: user.comments }, { merge: true });
      await setDoc(commentRef, { replies: comment.replies, num_replies: comment.replies.length }, { merge: true });

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

async function getUserFollowedStories(user: User) {

    const followed_sources = user.following;
    const followed_stories: Story[] = [];
    
    for (const source_id of followed_sources) {
        
        const source = await getSource(source_id, true);
        followed_stories.push(source.stories[source.stories.length-1]);

    }

    return followed_stories;
}

export { 
    convertTimestampToDate, 
    getUser,
    getStory, 
    getStories,
    getRelatedStories,
    checkLikesStory,
    checkLikesComment,
    checkLikesDiscussion,
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
    getReplies,
    getAllStories,
    getUserFollowedStories,
    formatTitle
}