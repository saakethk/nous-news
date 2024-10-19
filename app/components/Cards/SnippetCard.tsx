"use client";

import { Card, Image, CardFooter, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SnippetCard({id, headline, image_url}: {id: string, headline: string, image_url: string}) {
    const router = useRouter()
    return (
        <Card
        isPressable
        onPress={() => router.push("/snippets/"+id)}
        isFooterBlurred
        radius="lg"
        className="border-none snippet_card"
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={image_url}
                width={200}
            />
            <CardFooter className="py-2 -my-1 justify-between overflow-hidden absolute before:rounded-xl bottom-1 w-[calc(100%)] shadow-small z-10">
                <p className="text-tiny text-white/80">{headline}</p>
                <Link className="text-tiny text-white/100 bg-black/50 hover:bg-black/80 rounded-lg px-3 py-1" href={"/snippets/"+id}>
                    Read
                </Link>
            </CardFooter>
        </Card>
    )
}
