import { createContext, useContext, useEffect, useState } from "react";

interface ProviderProps {
    isDarkMode: boolean,
    toggleDarkMode(): void,
}

const ThemeContext = createContext<ProviderProps>({
    isDarkMode: true,
    toggleDarkMode: () => {} 
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode , setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("isDarkMode");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));

        console.log("called")

        if (isDarkMode)
            document.body.classList.add("dark");
        else
            document.body.classList.remove("dark");
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}