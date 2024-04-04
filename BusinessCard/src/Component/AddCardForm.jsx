import React, { useState } from 'react';
import "./AddCardForm.css";

function AddCardForm ({addCard}) {
    const [newCard, setNewCard]  = useState({
        name: "",
        description: "",
        socialMedia: {
            linkedin: "",
            twitter: ""
        },
        interests: []
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCard({
            ...newCard,
            [name] : value
        })
    }
    
    const handleInterestChange = (e) => {
        const interests = e.target.value.split(",");
        setNewCard({
            ...newCard, interests
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCard(newCard);
        setNewCard({
          name: '',
          description: '',
          socialMedia: {
            linkedin: '',
            twitter: '',
          },
          interests: [],
        });
    }
    return (
        <>
            <div className="add-card-form">
                <h2>Add NEW CARD</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name='name'
                        placeholder='Name'
                        value={newCard.name}
                        onChange= {handleChange}
                    />
                    <textarea name="description" 
                        placeholder='Description'
                        value={newCard.description}
                        onChange={handleChange}
                        required
                    />
                    <input type="text" name="linkedin" placeholder="Linkedin" value={newCard.socialMedia.linkedin} onChange={(e) => 
                    setNewCard({
                        ...newCard,
                        socialMedia: {
                            ...newCard.socialMedia,
                            linkedin: e.target.value
                        }
                    })
                    }
                    />
                     <input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={newCard.socialMedia.twitter}
          onChange={(e) =>
            setNewCard({
              ...newCard,
              socialMedia: { ...newCard.socialMedia, twitter: e.target.value },
            })
          }
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests (comma separated)"
          value={newCard.interests}
          onChange={handleInterestChange}
        />
        <button type="submit">Add Card</button>
                </form>
            </div>
        </>
    )
}

export default AddCardForm;
