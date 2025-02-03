import { useContext, useState, createContext } from "react";

const SiteDefinitions = createContext();

export const useDefinitions = () => useContext(SiteDefinitions);

export const DefinitionsProvider = ({ children }) => {


    const storageTheme = JSON.parse(localStorage.getItem('theme'));
    const [theme, setTheme] = useState(storageTheme !== undefined ? storageTheme : true);

    if (!theme) document.querySelector('body').classList.add('light-mode');
    if (theme) document.querySelector('body').classList.remove('light-mode');

    const toggleTheme = () => {
        setTheme(prev => {
            localStorage.setItem('theme', JSON.stringify(!prev))

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