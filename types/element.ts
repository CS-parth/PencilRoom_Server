
import { Tools } from './tool'

export type ElementType = {
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: Tools,
    text?: String,
    offsetX?: number, // conditional property
    offsetY?: number,
    position?: string | null,
    points?: {x:number,y:number}[];
    roughElement?: any
  }