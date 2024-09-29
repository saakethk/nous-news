import {Card, Image, CardFooter, Link} from "@nextui-org/react";

export default function SnippetCard({id, headline, image_url}: {id: string, headline: string, image_url: string}) {
    return (
        <Card
        isPressable
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
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-black/80">{headline}</p>
                <Link className="text-tiny text-black bg-black/20 hover:bg-black/40 rounded-lg px-3 py-1" href={"/snippets/"+id}>
                    Read
                </Link>
            </CardFooter>
        </Card>
    )
}
