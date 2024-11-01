import { ClassSettings, Room, RoomStatus } from './room'
import { User } from './user'
import { ElementType } from './element'

interface ServerToClientEvents {
    updateUser: (socketId: string) => void,
    roomCreated: (room: Room) => void
    roomError: (error: string) => void
    updateRoom: (room: Room) => void
    updateElements: (action: ElementType[] | ((prev: ElementType[]) => ElementType[]),overwrite:boolean) => void
    loading: (message: string) => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void
  }
  
  interface Response<T> {
    success: boolean
    data?: T
    error?: Error
  }
  
  interface ClientToServerEvents {
    createRoom: (user: User, settings: ClassSettings,elements: ElementType[], callback: (res: Response<Room>) => void) => void
    joinRoom: (roomId: string, user: User, callback: (res: Response<Room>) => void) => void
    exitRoom: (roomId: string, callback: (res: Response<Room>) => void) => void
    startClass: (roomId: string, paragraph: string, callback: (res: Response<Room>) => void) => void
    classStatusUpdate: (roomId: string, status: RoomStatus, callback: (res: Response<Room>) => void) => void
    // userProgressUpdate: (
    //   roomId: string,
    //   socketId: string,
    //   progress: Progress,
    //   callback: (res: Response<Room>) => void
    // ) => void
    updateElements: (action: ElementType[] | ((prev: ElementType[]) => ElementType[]),roomId:string,overwrite:boolean) => void
    endClass: (roomId: string, callback: (res: Response<Room>) => void) => void
  }
  
  interface InterServerEvents {
    endClass: (roomId: string, callback: (res: Response<Room>) => void) => void
  }
  
  interface SocketData {
    name: string
    age: number
  }
  
  export { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData }