"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SideBarHomeButton, SideBarNewsButton, SideBarSignInButton, SideBarAccountButton, SideBarDiscussionsButton } from "../Buttons/SideBarNavButtons";

export default function SideBar() {
    return (
        <>
            <SignedOut>
                <div className="sidebar_vertical">
                    <h1>SideBar</h1>
                    <div className="sidebar_vertical_buttons">
                        <SideBarHomeButton vertical={true} />
                        <SideBarNewsButton vertical={true} />
                        <SideBarDiscussionsButton vertical={true} />
                    </div>
                    <SideBarSignInButton vertical={true} />  
                </div>
                <div className="sidebar_horizontal"> 
                    <SideBarHomeButton vertical={false} />
                    <SideBarNewsButton vertical={false} />
                    <SideBarDiscussionsButton vertical={false} /> 
                    <SideBarSignInButton vertical={false} />   
                </div>
            </SignedOut>
            <SignedIn>
                <div className="sidebar_vertical">
                    <h1>SideBar</h1>
                    <div className="sidebar_vertical_buttons">
                        <SideBarHomeButton vertical={true} />
                        <SideBarNewsButton vertical={true} />
                        <SideBarDiscussionsButton vertical={true} />
                    </div>
                    <SideBarAccountButton vertical={true} />  
                </div>
                <div className="sidebar_horizontal">
                    <SideBarHomeButton vertical={false} />
                    <SideBarNewsButton vertical={false} />
                    <SideBarDiscussionsButton vertical={false} />
                    <SideBarAccountButton vertical={false} />    
                </div>
            </SignedIn>
        </>
    )
}

