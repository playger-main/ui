// ui/pg/src/app/interfaces/interfaces.ts

export interface IGeoLocation {
  lat: number;
  lng: number;
  address?: string | null;
}

/** Ground из твоего бекенда */
export interface IGround {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;

  kindofsport?: string[];
  coverage?: string[];

  geolocation?: IGeoLocation | null;

  createdAt?: any;
  updatedAt?: any;

  eventsCount?: number;
  isFavorite?: boolean;
  avgRating?: number;

  avatar?: string | null;
}

/** То что реально приходит в event.creator */
export interface IEventCreator {
  id: string;
  name: string;
  role: string[];
}

/** То что реально приходит в event.ground */
export interface IEventGround {
  id: string;
  name: string;
  address: string;
}

/** Event — строго как ты показал */
export interface IEvent {
  id: string;
  name: string;
  description: string;

  date: string;       // "2025-10-12"
  startTime: string;  // "14:00"
  duration: string;   // "1.5 hours"

  createdAt: string;  // "1759328822928"
  updatedAt: string;  // "1759328822928"

  creator?: IEventCreator;
  ground?: IEventGround;
}

/** DTO для POST /event */
export interface ICreateEventDto {
  name: string;
  description: string;
  date: string;
  startTime: string;
  duration: string;
  groundId: string;
}

/** User /user/:id */
export interface IUser {
  id: string;
  username: string;
  email: string;
  geolocation: IGeoLocation | null;
  roles: string[];
  createdAt: number; // у тебя number в /user/me
  updatedAt: number;
  isEmailConfirmed: boolean;
  confirmationToken: string;
}

/** /user/me — по факту такой же как IUser */
export interface ICurrentUser extends IUser {}

export interface IFavoriteListSport {
  icon: string;
  type: string;
}

export interface IRefreshToken {
  id: string;
  refresh: string;
  userId: string;
}

export interface IMigration {
  id: string;
  timestamp: string;
  name: string;
}