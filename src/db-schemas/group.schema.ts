// Group is universal for both the course and the master class
import mongoose from 'mongoose';

export class Group {
    _id: mongoose.Schema.Types.ObjectId;

    type: string; // (online or offline), maybe another name

    date: object; // start, end

    time: object; // start, end

    price: number;

    clientIds: [mongoose.Schema.Types.ObjectId];

    video: string; // url
}