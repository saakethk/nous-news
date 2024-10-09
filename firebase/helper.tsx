
import ShortUniqueId from 'short-unique-id';
import { db } from "./config";
import { Story, Snippet, User, Source, Discussion, Comment } from "./database_types";
import { doc, setDoc, getDoc, Timestamp, getDocs, collection } from "firebase/firestore";


// Generates unique id for creating objects
function generateID() {

    const { randomUUID } = new ShortUniqueId({ length: 22 });

    return randomUUID();

}

// Converts Firebase Timestamp type into Typescript Date
function convertTimestampToDate(timestamp: Timestamp): Date {

    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

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

// Check if user liked story already
async function checkLikesStory(user_id: string, story_id: string) {

    const user = await getUser(user_id);

    if (user.liked.includes(story_id)) {
        return true;
    }
    else {
        return false;
    }

}

// Updates like on story and user
async function likeStory(user_id: string, story_id: string, current_likes: number) {
    
    const storyRef = doc(db, "stories", story_id);
    const userRef = doc(db, "users", user_id);
    const user = await getUser(user_id);
    user.liked.push(story_id);
    
    try {

        await setDoc(storyRef, { likes: current_likes + 1 }, { merge: true });
        await setDoc(userRef, { liked: user.liked}, { merge: true });

        return {
            success: true,
            likes: current_likes + 1
        }

    } catch (error) {

        return {
            success: false,
            likes: current_likes
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
async function createDiscussion(user_id: string, story_id: string, text_content: string) {
    
    const discussionId = generateID();
    const discussionRef = doc(db, "discussions", discussionId);

    const userRef = doc(db, "users", user_id);
    const user = await getUser(user_id);
    user.discussed.push(story_id);

    try {

        const discussion: Discussion = {
          user_association: user_id,
          id: discussionId,
          story_association: story_id,
          date_created: Timestamp.fromDate(new Date()),
          text: text_content,
          likes: 0,
          comments: []
        }
        await setDoc(discussionRef, discussion, { merge: true });
        await setDoc(userRef, { discussed: user.discussed }, { merge: true });

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

    return comments;

}

// Creates new discussion
async function createComment(user_id: string, discussion_id: string, text_content: string) {
    
    const commentId = generateID();
    const commentRef = doc(db, "comments", commentId);

    const userRef = doc(db, "users", user_id);
    const user = await getUser(user_id);
    user.comments.push(commentId);

    try {

        const comment: Comment = {
            id: commentId,
            user_association: user_id,
            discussion_association: discussion_id,
            text: text_content,
            likes: 0,
            date_created: Timestamp.fromDate(new Date())
        }
        await setDoc(commentRef, comment, { merge: true });
        await setDoc(userRef, { discussed: user.comments }, { merge: true });

        return {
            success: true, 
            id: commentId
        };

    } catch (error) {

        return {
            success: false, 
            id: commentId
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
    likeDiscussion
};