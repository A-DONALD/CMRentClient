import React from "react";

export const Tooltip = ({ position, content, children }) => (
    <div id="tooltip" className="relative cursor-pointer group">
        <div className="">{children}</div>
        <span
            className={`
                absolute hidden group-hover:inline-block bg-gray-200 text-gray-800 dark:bg-neutral-900 dark:text-white text-xs p-2 whitespace-nowrap rounded
                ${position === "top" && "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"}
                ${position === "bottom" && "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"}
                ${position === "left" && "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"}
                ${position === "right" && "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"}
                ${position === "top-right" && " bottom-[calc(100%+5px)]"}
            `}
        >
            {content}
        </span>
    </div>
);