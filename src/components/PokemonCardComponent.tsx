'use client';

import React from 'react';

interface PokemonCardProps {
    id: bigint
    name: string,
    sprite: string,
    types: any,
}

export default function PokemonCardComponent({
    id,
    name,
    sprite,
    types
} : PokemonCardProps) {
    return (
        <div className='pokemon-card card bg-base-100 shadow-xl'>
            <figure className='pokemon-card_img'>
                <img className='w-32 h-32' src={sprite} alt={name} />
            </figure>
            <div className='pokemon-card_id'>
                <>
                    #{id}
                </>
            </div>
            <div className='card-body'>
                <h3 className='pokemon-card_name card-title capitalize'>{name}</h3>
                <p className='pokemon-card_details'>
                    {types.map((type : any) => type.type.name).join(', ')}
                </p>
            </div>
        </div>
    )
}
