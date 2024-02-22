import React, { useEffect, useState } from 'react'
import { themeSwitch } from '../../lib/data';

function Home() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "system");
    const element = document.documentElement;
    // check if user preference is light or dark
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // afficher la préférence
    // console.log(darkQuery);
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
                localStorage.setItem('theme', "dark");
                break;
            case "light":
                element.classList.remove('dark');
                localStorage.setItem('theme', "light");
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
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
            <div className='fixed top-5 right-10 duration-100 dark:slate-700 bg-gray-100 rounded'>
                {
                    themeSwitch?.map(opt => (
                        <button key={opt.text} onClick={() => setTheme(opt.text)} className={`w-12 h-12 leading-9 rounded-full m-1 ${theme === opt.text && "text-sky-600"}`}>{opt.text}</button>
                    ))
                }
            </div>
            <div>
                <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
                </span>
            </div>
            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
            </p>
        </div>
    )
}

export default Home