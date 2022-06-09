import logo from './logo.svg';
import React from 'react';
import './App.css';
import Title from './components/Title';
import MainCard from './components/MainCard';
import Form from './components/Form';
import Favorites from './components/Favorite';

const jsonLocalStorage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
};
const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = 'https://cataas.com';
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
    const CAT1 = 'https://cataas.com/cat/60b73094e04e18001194a309/says/react';
    const CAT2 = 'https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn';
    const CAT3 = 'https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript';
    const [counter, setCounter] = React.useState(jsonLocalStorage.getItem('counter'));
    const [title, setTitle] = React.useState('');
    const [catImg, setCatImg] = React.useState(CAT1);
    const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem('favorites') || []);

    async function setInitialCat() {
        const newCat = await fetchCat('first cat');
        setCatImg(newCat);
    }

    React.useEffect(() => {
        setInitialCat();
    }, []);

    const alreadyFavorite = favorites.includes(catImg);

    async function updateMainCat(value) {
        const newCat = await fetchCat(value);
        setCatImg(newCat);
        setCounter((prev) => {
            const nextCounter = prev + 1;
            jsonLocalStorage.setItem('counter', nextCounter);
            return nextCounter;
        });
    }

    function handleHeartClick() {
        const nextFavorites = [...favorites, catImg];
        setFavorites(nextFavorites);
        jsonLocalStorage.setItem('favorites', nextFavorites);
    }
    const counterTitle = counter === null ? '' : counter + '번째 ';
    return (
        <div>
            <Title>{counterTitle}고양이 가라사대</Title>
            <Form updateMainCat={updateMainCat} />
            <MainCard img={catImg} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite}></MainCard>
            <Favorites favorites={favorites} />
        </div>
    );
};

export default App;
