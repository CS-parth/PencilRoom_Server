// import { GameDifficulties, GameDuration, GameModes } from './class'
import { ElementType } from './element'
import { User } from './user'

export interface ClassSettings {
//   mode: GameModes
//   difficulty: GameDifficulties
//   duration: GameDuration
}

export enum RoomStatus {
  WAITING,
  RUNNING,
  FINISHED
}

// export interface Progress {
//   wpm: number
//   accuracy: number
//   correctWordsArray: string[]
//   incorrectWordsArray: string[]
// }

export interface Room {
  roomId: string
  owner: User
  users: User[]
//   usersProgress: {
//     key: string
//     value: Progress
//   }[]
  classSettings: ClassSettings
  elements: ElementType[]
  status: RoomStatus
  createdAt: Date,
  timer: number
}