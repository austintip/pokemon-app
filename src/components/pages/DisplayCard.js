import React from 'react';


function DisplayCard({ pokemon }) {
    return (
        <div className="card">
            <div className="card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="card__name">
                {pokemon.name}
            </div>
            <div className="card__types">
                {pokemon.types.map(type => {
                    return (
                        <div className="card__type">
                            {type.type.name}
                        </div>
                    )
                })}
            </div>
            <div className="card__info">
                <div className="card__data card__data--weight">
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="card__data card__data--height">
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="card__data card__data--ability">
                    <p className="title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}

export default DisplayCard;