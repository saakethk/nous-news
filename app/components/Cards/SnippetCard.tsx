"use client";

import { Card, Image, CardFooter, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Snippet } from "@/firebase/database_types";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
    const router = useRouter()
    return (
        <Card
        isPressable
        onPress={() => router.push("/snippets/"+snippet.id)}
        isFooterBlurred
        radius="lg"
        className="border-none snippet_card"
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={snippet.thumbnail}
                width={200}
            />
            <CardFooter className="py-2 -my-1 justify-between overflow-hidden absolute before:rounded-xl bottom-1 w-[calc(100%)] shadow-small z-10">
                <p className="text-tiny text-white/80">
                    {snippet.title}
                </p>
                <Link className="text-tiny text-white/100 bg-black/50 hover:bg-black/80 rounded-lg px-3 py-1" href={"/snippets/"+snippet.id}>
                    Read
                </Link>
            </CardFooter>
        </Card>
    )
}
