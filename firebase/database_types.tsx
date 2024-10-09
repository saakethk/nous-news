
import { Timestamp } from "firebase/firestore";

interface Story {
    id: string;
    date_added: Timestamp;
    image: string;
    source: string;
    link: string;
    summary: string;
    title: string;
    snippet_association: string;
    likes: number;
    discussions: Array<string>;
}

interface Source {
    name: string;
    likes: number;
    num_stories: number;
    image: string;
    rss_feed_url: string;
    description: string;
    stories: Array<string>;
    date_added: Timestamp;
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

interface User {
    id: string;
    active: boolean;
    avatar: string;
    date_joined: Timestamp;
    email: string;
    liked: Array<string>;
    discussed: Array<string>;
    liked_discussions: Array<string>;
    comments: Array<string>;
    liked_comments: Array<string>;
    name: string;
    premium: boolean
}

interface Discussion {
    id: string;
    user_association: string;
    story_association: string;
    text: string;
    likes: number;
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
}

export type { Story, Source, Snippet, User, Discussion, Comment };