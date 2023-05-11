'use client';

import React from 'react';
import { IPokemon } from "../../models/Pokemon";
import { Breadcrumbs } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const stats = {
    hp: {
        name: "HP",
        color: "bg-red-300"
    },
    attack: {
        name: "ATK",
        color: "bg-orange-300"
    },
    defense: {
        name: "DEF",
        color: "bg-yellow-500"
    },
    'special-attack': {
        name: "SpA",
        color: "bg-cyan-300"
    },
    'special-defense': {
        name: "SpD",
        color: "bg-green-300"
    },
    speed: {
        name: "SPD",
        color: "bg-pink-300"
    }
}

export default function PokemonPage({ pokemon }: {
    pokemon: IPokemon
}) {
    return (
        <>
            <Breadcrumbs>
                <a href="/" className="opacity-60">
                Home
                </a>
                <a href={`/pokemon/${pokemon.name}`} className="opacity-60 capitalize">
                    { pokemon.name }
                </a>
            </Breadcrumbs>
            <div className="bg-white mt-6 px-6 py-9 rounded-lg">
                <div className="grid grid-cols-6 gap-1">
                    <div className="col-span-6 xl:col-span-2">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id}.png`} className="w-64 h-64 m-auto"></img>
                        <div className="text-center text-lg text-gray-400 font-bold">#{pokemon._id}</div>
                        <div className="text-center text-2xl text-black-400 font-bold capitalize">{pokemon.name}</div>
                        <div className="text-center mt-3">
                            { pokemon.types.map((type) => (
                                <span key={type.name}>{type.name}</span>
                            ))}
                        </div>
                        <div className="text-center text-xl text-black-400 font-bold mt-3 mb-1">
                            ABILITIES
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            { pokemon.abilities.filter((value, index, self) => self.indexOf(value) === index).map(ability => (
                                <span className={`bg-gray-200 p-3 capitalize rounded-lg font-semibold ${Number(ability.slot) === 3 ? "border border-red-300" : ""}`} key={ability.ability.name}>
                                    {ability.ability.name.replaceAll('-', ' ')}
                                </span>    
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="col-span-1">
                                <div className="text-center text-xl text-black-400 font-bold mb-1">
                                    HEIGHT
                                </div>
                                <div className="bg-gray-200 p-3 rounded-lg font-semibold">
                                    {pokemon.height / 10}m
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="text-center text-xl text-black-400 font-bold mb-1">
                                    WEIGHT
                                </div>
                                <div className="bg-gray-200 p-3 rounded-lg font-semibold">
                                    (N/A)kg
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="col-span-1">
                                <div className="text-center text-xl text-black-400 font-bold mb-1">
                                    BASE EXP
                                </div>
                                <div className="bg-gray-200 p-3 rounded-lg font-semibold">
                                {pokemon.base_experience}
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="text-center text-xl text-black-400 font-bold mb-1">
                                    LEVELING RATE
                                </div>
                                <div className="bg-gray-200 p-3 rounded-lg font-semibold">
                                    (N/A)
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-xl text-black-400 font-bold mt-3 mb-1">
                            STATS
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            { pokemon.stats.map(stat => (
                                <div className="bg-gray-200 px-1 py-3 rounded-full text-center" key={stat.stat.name}>
                                    <div className={`${stats[stat.stat.name as keyof typeof stats].color} rounded-full w-9 h-9 m-auto text-white flex`}>
                                        <div className="m-auto font-semibold text-sm">
                                            {stats[stat.stat.name as keyof typeof stats].name}
                                        </div>
                                    </div>
                                    <div className="mt-3 font-semibold">
                                        {stat.base_stat}
                                    </div>
                                </div>
                            ))}
                             <div className="bg-blue-300 px-1 py-3 rounded-full text-center">
                                <div className={`bg-blue-500 rounded-full w-9 h-9 m-auto text-white flex`}>
                                    <div className="m-auto font-semibold text-sm">
                                        TOT
                                    </div>
                                </div>
                                <div className="mt-3 font-semibold">
                                    { pokemon.stats.reduce((acc, curr) => (acc + curr.base_stat), 0) }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 xl:col-span-4">
                        <div className="text-center text-xl text-black-400 font-bold mt-3">
                            POKEDEX ENTRY
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200 px-6 py-3 mt-12 rounded-xl">
                            { pokemon._id > 1 ?
                                <div className={`text-left ${pokemon._id == 1008 ? "col-span-2" : ""}`}>
                                <a href={`/pokemon/${pokemon._id - 1}`}>
                                        <ArrowLeftIcon className="h-6 w-6 inline mr-3" />
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id - 1}.png`} className="w-16 h-16 mr-3 inline" />
                                        <span>name #{pokemon._id - 1}</span>
                                    </a>
                                </div>
                            : ""}
                            { pokemon._id < 1008 ?
                                <div className={`text-right ${pokemon._id == 1 ? "col-span-2" : ""}`}>
                                    <a href={`/pokemon/${pokemon._id + 1}`}>
                                        <span className="mr-3">name #{pokemon._id + 1}</span>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id + 1}.png`} className="w-16 h-16 mr-3 inline" />
                                        <ArrowRightIcon className="h-6 w-6 inline" />
                                    </a>
                                </div>
                            : ""}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}