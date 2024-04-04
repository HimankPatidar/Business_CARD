import React, {useState, useEffect} from 'react';
import Card from './Component/Card';
import AddCardForm from './Component/AddCardForm';
import './App.css';

function App () {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCard();
  }, [])

  const fetchCard = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);

    }
  }
  const addCard = async (newCard) => {
    try {
      const response = await fetch("http://localhost:3001/api/cards", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json", 
        },
        body : JSON.stringify(newCard)
      });
      const data = await response.json();
      setCards([...cards, data])
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/cards/${id}`, {
        method: 'DELETE',
      });
      setCards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.error('Error deleting card:', error); 
    }
  }

  const updateCard = async (id, updatedCard) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cards/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(updatedCard),
      })
      const data =  await response.json();
      setCards(cards.map((card) => (card._id) === id ? data : card))
    } catch (error) {
      
    }
  }

  return (
    <>
       <div className="App">
      <h1>Business Card Manager</h1>
      <AddCardForm addCard={addCard} />
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default App;