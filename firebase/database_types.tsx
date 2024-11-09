
import { Timestamp } from "@firebase/firestore";

interface User {
    id: string;
    active: boolean;
    avatar: string;
    date_joined: Timestamp;
    email: string;
    following: Array<string>;
    liked: Array<string>;
    discussed: Array<string>;
    liked_discussions: Array<string>;
    comments: Array<string>;
    liked_comments: Array<string>;
    name: string;
    premium: boolean;
    last_login: Timestamp;
}

interface Story {
    id: string;
    date_added: Timestamp;
    image: string;
    source: string;
    link: string;
    summary: string;
    title: string;
    snippet_association: string;
    category: string;
    likes: number;
    num_discussions: number;
    discussions: Array<string>;
}

interface Category {
    id: string;
    name: string;
    num_stories: number;
    stories: Array<string>;
}

interface Feed {
    id: string;
    url: string;
    category_association: string;
}

interface Source {
    id: string;
    name: string;
    description: string;
    logo: string
    date_added: Timestamp
    follows: number
    num_stories: number
    bias: number
    feeds: Array<string>
    stories: Array<string>
}

interface Snippet {
    id: string;
    title: string;
    description: string;
    date_created: Timestamp;
    sources: Array<string>;
    stories: Array<string>;
    thumbnail: string;
}

interface Discussion {
    id: string;
    user_association: string;
    story_association: string;
    text: string;
    likes: number;
    num_comments: number;
    comments: Array<string>;
    date_created: Timestamp;
}

interface Comment {
    id: string;
    user_association: string;
    discussion_association: string;
    text: string;
    likes: number;
    date_created: Timestamp;
    num_replies: number;
    replies: Array<string>;
}

export type { 
    Story,
    Category,
    Feed, 
    Source, 
    Snippet, 
    User, 
    Discussion, 
    Comment 
};