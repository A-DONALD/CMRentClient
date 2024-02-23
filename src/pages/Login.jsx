import { useState, useEffect } from 'react'
import HomeHero from '../components/HomeHero';

function Login() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "system");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const element = document.documentElement;

    // theme logic
    function onWindowMatch() {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    };
    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add('dark');
                break;
            case "light":
                element.classList.remove('dark');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMatch();
                break;
        }
    }, [theme]);
    darkQuery.addEventListener("change", (e) => {
        if (!("theme" in localStorage)) {
            if (e.matches) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        }
    });

    return (
        <HomeHero />
    )
}

export default Login