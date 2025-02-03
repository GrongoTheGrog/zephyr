import { useContext, useState, createContext } from "react";

const SiteDefinitions = createContext();

export const useDefinitions = () => useContext(SiteDefinitions);

export const DefinitionsProvider = ({ children }) => {

    const [theme, setTheme] = useState(true);

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev) document.querySelector('body').classList.add('light-mode');
            if (!prev) document.querySelector('body').classList.remove('light-mode');
            return !prev;
        });
    }

    class Definition {
        constructor(data, set){
            this.data = data;
            this.set = set;
        }
    }

    const definitions = {
        theme: new Definition(theme, toggleTheme)
    }

    return (
        <SiteDefinitions.Provider value={definitions}>
            {children}
        </SiteDefinitions.Provider>
    )
}