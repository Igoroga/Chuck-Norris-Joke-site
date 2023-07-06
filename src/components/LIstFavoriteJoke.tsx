import React from 'react';
import styled from 'styled-components';
import { userSlice } from '../store/reducers/UserSlice';
import { useAppDispatch } from '../hooks/redux';


const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:150px;
`;

const JokeItem = styled.div`
  margin: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const JokeNumber = styled.span`
  margin-right: 8px;
  font-weight: bold;
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

interface ListFavoriteJokeProps {
    jokes: string[];
}

const ListFavoriteJoke: React.FC<ListFavoriteJokeProps> = ({ jokes }) => {
    const dispatch = useAppDispatch();


    if (jokes.length === 0) {
        return (
            <Wrapper>
                <h1>Вы еще не добавили разрывных шуток</h1>;
            </Wrapper>
        )
    };

    return (
        <ListWrapper>
            {jokes.map((joke, index) => (
                <JokeItem key={index}>
                    <JokeNumber>{index + 1}.</JokeNumber>
                    {joke}
                </JokeItem>
            ))}
        <Button
        style={{ backgroundColor: 'red' }}
        onClick={() => dispatch(userSlice.actions.deleteLikeJokeList())}
      >Delete All</Button>
        </ListWrapper>
    );
};

export default ListFavoriteJoke;