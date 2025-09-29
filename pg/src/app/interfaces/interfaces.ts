export interface IEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  location: ILocation;
  category: string;
  groundId?: string;
  maxPeople?: number;
  requestCount?: number;
}

export interface IGround {
  id: string;
  name: string;
  isFavorite: boolean;
  kindOfsport: string;
  coverage: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  location: ILocation;
  isEvent?: boolean;
  idsEvents: string[];
  reviews: IReview[] | null;
  avatar: string;
  averageRating?: number;
  listImgs?: string[];
}

export interface IReview {
  id: string;
  userId: string;
  groundId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILocation {
  lat: string;
  lng: string;
  address: string;
}

export interface ICurrentUser {
  id: string;
  username: string;
  email: string;
  geolocation: ILocation;
  createdAt: string;
  updatedAt: string;
  roles: string;
  password: string;
  isEmailConfirmed: boolean;
  confirmationToken: string;
  favoriteGroundIds?: string[];
  listOrganizeEvents?: string[];
  listParticipateEvents?: string[];
  listFutureEvents?: string[];
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  geolocation: ILocation;
  createdAt: string;
  updatedAt: string;
  roles: string;
  isEmailConfirmed: boolean;
  favoriteGroundIds?: string[];
  listOrganizeEvents?: string[];
  listParticipateEvents?: string[];
  listFutureEvents?: string[]; //new
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

export interface IFavoriteListSport {
  icon: string;
  type: string;
}
