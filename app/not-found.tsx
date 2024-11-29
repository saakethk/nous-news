
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/28/24

// TYPE
"use client";

// IMPORTS
import { NousLogo } from "./components/Other/Logos";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";

// NOT FOUND - Not found page for application
export default function NotFound() {
    
    // Retrieves routing functions
    const router = useRouter();

    return (
        <div className="not_found_container">
            <div className="not_found_content">
                <NousLogo />
                <div className="not_found_heading">
                    <h1 className="heading">
                        Sorry the page you requested was not found.
                    </h1>
                    <Accordion variant="shadow" className="not_found_accordian">
                        <AccordionItem key="1" title="Why am I seeing this?">
                            You have entered a url that either no longer exists or has never existed. Because ItsNous is still developing, we are continously adding and removing pages. If you have any page you woudl like restored, kindly contact the creator at saakethr.kesireddy@gmail.com.
                        </AccordionItem>
                    </Accordion>
                    <Button startContent={<House/>} variant="shadow" color="primary" className="not_found_button" onPress={() => {router.push("/")}}>
                        Home
                    </Button>
                </div>
            </div>
        </div>
    )
}