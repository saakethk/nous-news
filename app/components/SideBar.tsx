"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SideBarHomeButton, SideBarNewsButton, SideBarSignInButton, SideBarAccountButton } from "./SideBarNavButtons";

export default function SideBar() {
    return (
        <>
            <SignedOut>
                <div className="sidebar_vertical">
                    <h1>SideBar</h1>
                    <div className="sidebar_vertical_buttons">
                        <SideBarHomeButton vertical={true} />
                        <SideBarNewsButton vertical={true} /> 
                    </div>
                    <SideBarSignInButton vertical={true} />  
                </div>
                <div className="sidebar_horizontal">
                    <SideBarNewsButton vertical={false} /> 
                    <SideBarHomeButton vertical={false} />
                    <SideBarSignInButton vertical={false} />    
                </div>
            </SignedOut>
            <SignedIn>
                <div className="sidebar_vertical">
                    <h1>SideBar</h1>
                    <div className="sidebar_vertical_buttons">
                        <SideBarHomeButton vertical={true} />
                        <SideBarNewsButton vertical={true} /> 
                    </div>
                    <SideBarAccountButton vertical={true} />  
                </div>
                <div className="sidebar_horizontal">
                    <SideBarNewsButton vertical={false} /> 
                    <SideBarHomeButton vertical={false} />
                    <SideBarAccountButton vertical={false} />    
                </div>
            </SignedIn>
        </>
    )
}

