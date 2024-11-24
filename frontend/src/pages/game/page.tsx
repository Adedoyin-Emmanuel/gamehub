
"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";


const Game = () => {

    const pathname = usePathname();

    return (
        <div>
            <h1>Game works!</h1>
            <p>Current pathname: {pathname}</p>
        </div>
    );  
}

export default Game;
    