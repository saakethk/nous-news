import { Timestamp } from "firebase/firestore";

export function convertTimestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}