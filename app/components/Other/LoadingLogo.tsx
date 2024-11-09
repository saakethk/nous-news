
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use server";

// IMPORTS
import { Image } from "@nextui-org/react"

// LOADING PAGE COMPONENT
export default async function LoadingPage() {
    return (
        <div className="loading_screen">
            <Image
                alt="Logo"
                width={120}
                height={50}
                src="https://firebasestorage.googleapis.com/v0/b/nous-news.appspot.com/o/assets%2Flogo.png?alt=media&token=abc6d4a2-7c55-4608-97d6-18b71c38e468"
            />
        </div>
    )
}