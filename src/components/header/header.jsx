import './header.css';
import { useDefinitions } from '../../siteDefinitions';
import blackAir from '../../assets/black-air.svg';
import whitekAir from '../../assets/white-air.svg';

import darkMode from '../../assets/dark-mode.svg';
import lightMode from '../../assets/light-mode.svg';

export const Header = () => {

    const theme = useDefinitions().theme.data;
    const toggleTheme = useDefinitions().theme.set;

    return(
        <header>
            <div className='left-header'>
                    
            </div>

            <div className='middle-header'>
                <span>
                    Zephyr
                </span>
                <img
                    src={theme ? whitekAir : blackAir}
                    className='image-logo'
                ></img>
            </div>

            <div className='left-header'>
                <button className='toggleTheme' onClick={toggleTheme}>
                    <img
                        src={theme ? lightMode : darkMode}
                    ></img>
                </button>
            </div>
        </header>
    )
}