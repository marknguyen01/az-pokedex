import mongoose from 'mongoose'


const typeSchema =  new mongoose.Schema({
    _id: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    damage_relations: {
        double_damage_from: [{
            name: String,
        }],
        double_damage_from_to: [{
            name: String,
        }],
        half_damage_from: [{
            name: String,
        }],
        half_damage_to: [{
            name: String,
        }],
        no_damage_from: [{
            name: String,
        }],
        no_damage_to: [{
            name: String,
        }],
    },
    moves: [{
        name: String,
    }],
    name: String,
}, { _id: false })

export default mongoose.models.Type || mongoose.model('Type', typeSchema);