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
}

export interface IGround {
    id: string;
    name: string;
    kindOfsport: string;
    coverage: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    location: ILocation;
    feedbacks: IFeedback[] | null;
    avatar: string;         // <-- new field
    averageRating?: number;  
    listImgs?: string[];
}

export interface IFeedback {
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

export interface IUser {
    id: string;
    username: string;
    email: string;
    geolocation: string;
    password: string;
    createdId: string;
    updatedId: string;
    roles: string;
    isEmailConfirmed: boolean;
    confirmationToken: string;
    favoriteGroundIds?: string[]; 

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
    type: string

}