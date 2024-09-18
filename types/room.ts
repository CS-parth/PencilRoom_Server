// import { GameDifficulties, GameDuration, GameModes } from './class'
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
  status: RoomStatus
  createdAt: Date,
  // elements,
  timer: number
}