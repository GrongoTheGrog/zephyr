import './search.css';
import blackSearch from '../../assets/search-black.svg';
import whiteSearch from '../../assets/search-white.svg';
import { useDefinitions } from '../../siteDefinitions';

const searchIcon = [blackSearch, whiteSearch];

export function Search() {

    const {theme} = useDefinitions();

    return (
        <section className='search-container'>
            <form className='form-search'>
                <input className='input-search' placeholder='E.g.: São Paulo'></input>
                <button className='button-search'> 
                    <img src={searchIcon[theme.data ? 0 : 1]}></img>
                </button>
            </form>
        </section>
    )
}