import SideBar from "@/app/components/General/SideBar";
import ContentContainer from "@/app/components/General/ContentContainer";
import { AccountSignOutButton } from "@/app/components/Buttons/AccountButtons";

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