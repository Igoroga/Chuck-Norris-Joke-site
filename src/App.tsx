import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchJokes } from './store/reducers/ActionCreators';
import { userSlice } from './store/reducers/UserSlice';
import Loader from './components/Loader';
import styled from 'styled-components';
import chakIMG from "./img/chakIMG.png"
import ModalWindow from './components/ModalWindow';
import ListFavoriteJoke from './components/LIstFavoriteJoke';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem; /* Увеличьте размер текста */
  font-weight: bold; /* Сделайте текст пожирнее */
  cursor: pointer;
  width: fit-content;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Добавьте тень на бок */

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

const ChuckImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 500px;
  margin-bottom: 16px;
  padding-right:8px;
  padding-left:8px;
`;

const CurrentJoke = styled.p`
  width: 100%;
  max-width: 410px;
  font-weight: bold;
  height:70px;
  position: relative;
  top: -100px;
  padding-right: 17px;
  padding-left: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

function App() {
  const dispatch = useAppDispatch();
  const { jokes, isLoading, error, likeJokeList } = useAppSelector(state => state.userReducer);
  const [currentJoke, setCurrentJoke] = useState('');
  const [showNewJoke, setShowNewJoke] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (jokes.length > 0) {
      setCurrentJoke(jokes[0].value);
    }
  }, [jokes]);

  useEffect(() => {
    dispatch(fetchJokes());
    const favoriteJokes = localStorage.getItem('favoriteJokes');
    if (favoriteJokes) {
      const parsedJokes = JSON.parse(favoriteJokes);
      dispatch(userSlice.actions.jokesFetchFavoriteList(parsedJokes));
    }
  }, []);

 
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (showNewJoke) {
      intervalId = setInterval(() => {
        dispatch(fetchJokes());
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showNewJoke, dispatch]);

  const toggleShowNewJoke = () => {
    setShowNewJoke(prevState => !prevState);
  };

  const addFavoriteJoke = (joke: string) => {
    dispatch(userSlice.actions.addLikeJokeList(joke ));
    const updatedFavoriteJokes = [...likeJokeList, joke];
    const limitedFavoriteJokes = updatedFavoriteJokes.slice(-10);
  
  localStorage.setItem('favoriteJokes', JSON.stringify(limitedFavoriteJokes));
};
  


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AppWrapper>

      <ModalWindow isOpen={isOpen} onClose={closeModal}>
        <ListFavoriteJoke jokes={likeJokeList}/>
      </ModalWindow>

      <Title>Chuck Norris Jokes</Title>
      <ChuckImage src={chakIMG} alt="Chuck Norris" />
      {isLoading ? (
        <div className='loader'>
        <Loader />
      </div>
        
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        
          <CurrentJoke>{currentJoke}</CurrentJoke>
        
      )}
     <div style={{ position: 'relative', top: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={() => dispatch(fetchJokes())}>Го еще</Button>
      <Button onClick={() => addFavoriteJoke(currentJoke)}>Add to Favorites</Button>
      <Button onClick={toggleShowNewJoke}>
        {showNewJoke ? 'Stop' : 'Start'} showing new jokes every 3 seconds
      </Button>
      <Button style={{ backgroundColor: 'red' }} onClick={openModal}>List Favorite</Button>
      </div>
    </AppWrapper>
  );
}

export default App