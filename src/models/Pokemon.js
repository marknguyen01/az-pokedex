import mongoose from 'mongoose'


const abilitySchema =  new mongoose.Schema({
    ability: {
        name: String,
    },
    isHidden: Boolean,
    slot: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
}, { _id: false })

const heldItemSchema = new mongoose.Schema({
    item: {
        name: String,
    }
}, { _id: false })

const statSchema = new mongoose.Schema({
    base_stat: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    effort: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    stat: {
        name: String
    }
}, { _id: false })

const typeSchema = new mongoose.Schema({
    slot: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    type: {
        name: String
    }
}, { _id: false });

const pokemonSchema = new mongoose.Schema({
    _id: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    abilities: [abilitySchema],
    base_experience: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    height: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    held_items: [heldItemSchema],
    name: String,
    is_default: Boolean,
    stats: [statSchema],
    types: [typeSchema],
})

export default mongoose.models.Pokemon || mongoose.model('Pokemon', pokemonSchema);