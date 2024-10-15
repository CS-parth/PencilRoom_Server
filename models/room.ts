import mongoose from 'mongoose';
import { Tools } from '../types/tool';

const ElementTypeSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    x1: { type: Number, required: true },
    y1: { type: Number, required: true },
    x2: { type: Number, required: true },
    y2: { type: Number, required: true },
    type: { type: String, enum: Tools, required: true }, 
    text: { type: String }, 
    offsetX: { type: Number },
    offsetY: { type: Number },
    position: { type: String, default: null },
    points: [{ x: { type: Number }, y: { type: Number } }],
    roughElement: { type: mongoose.Schema.Types.Mixed }
});

const ClassSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    elements: [ElementTypeSchema]
});

const Class = mongoose.model('Room', ClassSchema);

export default Class;