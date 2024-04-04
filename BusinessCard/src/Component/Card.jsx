import React, {useState, useEffect} from "react";
import './Card.css'

const Card = ({index, card, deleteCard, updateCard}) => {
    const [editing, setEditing] = useState(false);
    const [editedCard, setEditedCard] = useState(card);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedCard({...editedCard, [name]: value});
    };

    const handleSaved = () =>{
        updateCard(index, editedCard);
        setEditing(false);
    }

    return (
        <>
            <div className="card">
                {!editing ? (
                    <div>
                        <h2>{card.name}</h2>
                        <p>{card.description}</p>
                        <div>
                            {card.socialMedia.linkedin && (
                                <a href={card.socialMedia.linkedin} 
 target="_blank" rel="noopener noreferrer">Linkdin</a>
                            )}
                            {card.socialMedia.twitter && (
                            <a href={card.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                            )}
                        </div>
                        <h3>Interests</h3>
                        <ul>
                            {card.interests.map((interest, i) => {
                                <li key={i}>{interest}</li>
                            })}
                        </ul>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => deleteCard(index)}>Delete</button>
                    </div>

                ) : (
                    <div>
                        <input type="text" name="name" value={editedCard.name} onChange={handleChange}/>
                        <input type="text" name="description" value={editedCard.description} onChange={handleChange}/>
                        <input type="text" name="linkedin" value={editedCard.socialMedia.linkedin} onChange={handleChange}/>
                        <input type="text" name="twitter" value={editedCard.socialMedia.twitter} onChange={handleChange}/>
                        <input type="text" name="interests" value={editedCard.interests} onChange={handleChange}/>
                        <button onClick={handleSaved}>Save</button>
                    </div>
                
                )}
            </div>
        </>
    )
}

export default Card;