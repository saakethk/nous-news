

// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/16/24

// TYPE
"use server";

// IMPORTS
import SignInContainer from "@/app/components/Containers/SignInContainer";
import { SignUpButton } from "@/app/components/Buttons/Auth/SignInButton";

// SIGN IN PAGE
export default async function SignInPage() {
    return (
        <SignInContainer new_user={true}>
            <SignUpButton />
        </SignInContainer>
    )
}


