import { LocaleProvider } from "@/context/LocaleContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocaleProvider>
            {children}
        </LocaleProvider>
    );
}