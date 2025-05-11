import { IEvent, IGround, IUser } from "./interfaces/interfaces";


export const fakeGrounds: IGround[] = Array.from({ length: 20 }).map((_, i) => {
  const id = (i + 1).toString(); // <-- number as string ('1', '2', ... '20')
  const now = new Date().toISOString();
  const kindOfSport = ['Football', 'Basketball', 'Workout'];
  const addresses = [
    'Vingio Parkas, Vilnius',
    'Ozo g. 18, Vilnius',
    'Antakalnio g. 11, Vilnius',
    'Gedimino pr. 9, Vilnius',
    'Naugarduko g. 24, Vilnius'
  ];

  const lat = (54.6872 + i * 0.001).toFixed(6);
  const lng = (25.2797 + i * 0.001).toFixed(6);
  const address = addresses[i % addresses.length];
  const isEvent = i%2 == 0;
  const isFavorite = i%2 == 0;
  const reviews = [
    {
      id: crypto.randomUUID(),
      userId: `user${(i % 3) + 1}`,
      groundId: id,
      rating: 4 + (i % 2), // 4 or 5
      comment: i % 2 === 0 ? 'Great ground!' : 'Nice place, but can get crowded.',
      createdAt: now,
      updatedAt: now
    },
    {
      id: crypto.randomUUID(),
      userId: `user${(i % 3) + 2}`,
      groundId: id,
      rating: 3 + (i % 3), // 3, 4, or 5
      comment: i % 3 === 0 ? 'Needs better lighting.' : 'Well maintained.',
      createdAt: now,
      updatedAt: now
    }
  ];

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, f) => sum + f.rating, 0) / reviews.length
      : 0;

  // Example avatar: you can use a URL or an icon name
  const avatars = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // football field
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // basketball court
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80', // workout area
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // stadium
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', // park field
    ];
  const avatar = avatars[i % avatars.length];

  return {
    id,
    name: `Ground ${i + 1} - ${kindOfSport[i % kindOfSport.length]}`,
    kindOfsport: ['Football', 'Basketball', 'Workout'][i % 3],
    coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
    description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
    createdAt: now,
    updatedAt: now,
    location: {
      lat,
      lng,
      address
    },
    reviews,
    avatar,
    isEvent,
isFavorite,
    averageRating: Number(averageRating.toFixed(2))
  };
});





export const fakeListFavKindSport = [{icon: 'football', type: 'Football'}, {icon: 'basketball', type: 'Basketball'}, {icon: 'barbell', type: 'Workout'}]

export const EVENTS_MOCK: IEvent[] = [
  {
    id: '1',
    name: 'Spring Festival',
    description: 'A festival to celebrate the arrival of spring.',
    date: '2024-06-10',
    startTime: '10:00',
    duration: 120,
    createdAt: '2024-05-01T09:00:00Z',
    updatedAt: '2024-05-10T12:00:00Z',
    userId: 'user1',
    location: {
      lat: '54.6872',
      lng: '25.2797',
      address: 'Central Park, Vilnius'
    },
    category: 'Festival',
    groundId: '1'
  },
  {
    id: '2',
    name: 'Tech Conference',
    description: 'Annual technology conference with speakers from around the world.',
    date: '2024-07-15',
    startTime: '09:00',
    duration: 480,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-15T15:00:00Z',
    userId: 'user2',
    location: {
      lat: '54.6890',
      lng: '25.2765',
      address: 'Convention Center, Vilnius'
    },
    category: 'Conference',
    groundId: '1',
    maxPeople: 100,
    requestCount: 50
  },
  {
    id: '3',
    name: 'Art Expo',
    description: 'Exhibition of modern art from local artists.',
    date: '2024-08-05',
    startTime: '11:00',
    duration: 180,
    createdAt: '2024-07-01T11:00:00Z',
    updatedAt: '2024-07-20T13:00:00Z',
    userId: 'user3',
    location: {
      lat: '54.6900',
      lng: '25.2800',
      address: 'Art Gallery, Vilnius'
    },
    category: 'Exhibition',
    groundId: '3'
  },
  {
    id: '4',
    name: 'Winter Workout',
    description: 'Outdoor winter fitness event.',
    date: '2023-12-20',
    startTime: '08:30',
    duration: 90,
    createdAt: '2023-11-15T10:00:00Z',
    updatedAt: '2023-12-01T10:00:00Z',
    userId: 'user1',
    location: {
      lat: '54.6865',
      lng: '25.2755',
      address: 'Snow Park, Vilnius'
    },
    category: 'Fitness',
    groundId: '4'
  },
  {
    id: '5',
    name: 'Autumn Run',
    description: '5km fun run through the city parks.',
    date: '2023-10-10',
    startTime: '07:00',
    duration: 60,
    createdAt: '2023-09-01T08:00:00Z',
    updatedAt: '2023-09-25T09:00:00Z',
    userId: 'user2',
    location: {
      lat: '54.6880',
      lng: '25.2780',
      address: 'Green Park, Vilnius'
    },
    category: 'Running',
    groundId: '5'
  }
];

export const USERS_MOCK: IUser[] = [
  {
    id: 'user1',
    username: 'john_doe',
    email: 'john.doe@example.com',
    geolocation: {
      lat: '54.6872',
      lng: '25.2797',
      address: 'Gedimino pr. 9, Vilnius'
    },
    password: 'hashedpassword1',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
    roles: 'user',
    isEmailConfirmed: true,
    confirmationToken: 'token1',
    favoriteGroundIds: ['1', '3'],
    listOrganizeEvents: ['1', '4'],
    listParticipateEvents: ['2', '5']
  },
  {
    id: 'user2',
    username: 'sandra_dev',
    email: 'sandra.dev@example.com',
    geolocation: {
      lat: '54.6890',
      lng: '25.2765',
      address: 'Ozo g. 18, Vilnius'
    },
    password: 'hashedpassword2',
    createdAt: '2023-11-10T12:00:00Z',
    updatedAt: '2024-05-05T14:00:00Z',
    roles: 'admin',
    isEmailConfirmed: true,
    confirmationToken: 'token2',
    favoriteGroundIds: ['2'],
    listOrganizeEvents: ['5'],
    listParticipateEvents: ['1']
  },
  {
    id: 'user3',
    username: 'julia_sporty',
    email: 'julia@example.com',
    geolocation: {
      lat: '54.6900',
      lng: '25.2800',
      address: 'Naugarduko g. 24, Vilnius'
    },
    password: 'hashedpassword3',
    createdAt: '2023-09-20T08:30:00Z',
    updatedAt: '2024-04-10T09:15:00Z',
    roles: 'organizer',
    isEmailConfirmed: false,
    confirmationToken: 'token3',
    favoriteGroundIds: [],
    listOrganizeEvents: ['3'],
    listParticipateEvents: ['2']
  },
  {
    id: 'user4',
    username: 'martynas_fit',
    email: 'martynas.fit@example.com',
    geolocation: {
      lat: '54.6881',
      lng: '25.2789',
      address: 'Vingio Parkas, Vilnius'
    },
    password: 'hashedpassword4',
    createdAt: '2023-12-15T07:45:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
    roles: 'user',
    isEmailConfirmed: true,
    confirmationToken: 'token4',
    favoriteGroundIds: ['4', '5'],
    listOrganizeEvents: [],
    listParticipateEvents: ['1', '3']
  },
  {
    id: 'user5',
    username: 'greta_event',
    email: 'greta.events@example.com',
    geolocation: {
      lat: '54.6911',
      lng: '25.2771',
      address: 'Antakalnio g. 11, Vilnius'
    },
    password: 'hashedpassword5',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-05-10T12:00:00Z',
    roles: 'organizer',
    isEmailConfirmed: true,
    confirmationToken: 'token5',
    favoriteGroundIds: ['2', '3'],
    listOrganizeEvents: ['5'],
    listParticipateEvents: ['4']
  }
];


// ... other imports

export const currentUser: IUser = {
  id: '1',
  username: 'john_doe',
  email: 'john.doe@example.com',
  geolocation: {
    lat: '54.6872',
    lng: '25.2797',
    address: 'Gedimino pr. 9, Vilnius'
  },
  password: 'hashedpassword1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  roles: 'user',
  isEmailConfirmed: true,
  confirmationToken: 'token1',
  favoriteGroundIds: ['ground1', 'ground3', 'ground7'],
  listOrganizeEvents: [],
  listParticipateEvents: []
};


