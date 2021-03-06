import * as  mongoose from 'mongoose';

export interface MenuItem extends mongoose.Document {
    name: string,
    price: number
}

export interface Restaurant extends mongoose.Document {
    name: String,
    menu: MenuItem[],
}


const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true       
    }
});


const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});

export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema);
