

// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import SignInContainer from "@/app/components/Containers/SignInContainer";
import SignInButton from "@/app/components/Buttons/Auth/SignInButton";

// SIGN IN PAGE
export default async function SignInPage() {
    return (
        <SignInContainer>
            <SignInButton />
        </SignInContainer>
    )
}


