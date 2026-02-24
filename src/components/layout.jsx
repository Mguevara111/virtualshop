import React from "react";
import { Header } from "./header";
import { Message } from "./message";
import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}