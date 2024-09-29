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
    date_created: Timestamp;
    sources: Array<string>;
    stories: Array<string>;
    thumbnail: string;
}

export type { Story, Source, Snippet };