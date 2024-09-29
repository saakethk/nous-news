import SideBar from "@/app/components/SideBar";
import ContentContainer from "@/app/components/ContentContainer";
import { AccountSignOutButton } from "@/app/components/AccountButtons";

// Account Page
// Private page which allows user to see settings and their own liked snippets along with suggestions.
export default function AccountPrivate() {
    return (
        <>
            <SideBar />
            <ContentContainer heading="Your Account" subheading="Manage your account settings and more...">
                <AccountSignOutButton />
            </ContentContainer>
        </>
    )
}