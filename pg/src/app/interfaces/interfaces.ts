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
    groundId: string;
}

export interface IGround {
    id: string;
    name: string;
    coverage: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    locationId: string;

}

export interface ILocation {
    id: string;
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
    confirmationToken: string

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