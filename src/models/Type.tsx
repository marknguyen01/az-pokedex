import mongoose from 'mongoose'


export interface IType {
    _id: number,
    damage_relations: {
        double_damage_from: [{
            name: string,
        }],
        double_damage_to: [{
            name: string,
        }],
        half_damage_from: [{
            name: string,
        }],
        half_damage_to: [{
            name: string,
        }],
        no_damage_from: [{
            name: string,
        }],
        no_damage_to: [{
            name: string,
        }],
    },
    moves: [{
        name: string,
    }],
    name: string, 
}

const typeSchema =  new mongoose.Schema({
    _id: {
        type: Number,
        get: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
        set: (v:any) => parseInt(v) ? Math.round(parseInt(v)) : 0,
    },
    damage_relations: {
        double_damage_from: [{
            name: String,
        }],
        double_damage_to: [{
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
})

export default mongoose.models.Type || mongoose.model('Type', typeSchema);