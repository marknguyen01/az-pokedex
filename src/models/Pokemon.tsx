import {models, model, Schema} from 'mongoose'

export interface IPokemon {
    _id: number,
    abilities: [IAbility],
    base_experience: number,
    height: number,
    held_items: [IHeldItem],
    name: string,
    is_default: boolean,
    stats: [IStat],
    types: [IType],
}

interface IAbility {
    ability: {
        name: string,
    }
    isHidden: boolean,
    slot: number,
}

interface IHeldItem {
    item:  {
        name: string,
    }
}

interface IStat {
    base_stat: number,
    effort: number,
    stat: {
        name: string
    }
}

interface IType {
    slot: number,
    type: {
        name: string,
        _id: number,
    },
}

const abilitySchema =  new Schema<IAbility>({
    ability: {
        name: String,
    },
    isHidden: Boolean,
    slot: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    }
}, { _id: false })

const heldItemSchema = new Schema<IHeldItem>({
    item: {
        name: String,
    }
}, { _id: false })

const statSchema = new Schema<IStat>({
    base_stat: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    effort: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    stat: {
        name: String
    }
}, { _id: false })

const pokemonSchema = new Schema({
    _id: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    abilities: [abilitySchema],
    base_experience: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    height: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    held_items: [heldItemSchema],
    name: String,
    is_default: Boolean,
    stats: [statSchema],
    types: [{
        type: Number,
        ref: 'Type'
    }],
});


export default models.Pokemon || model<IPokemon>('Pokemon', pokemonSchema);