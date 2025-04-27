import { IGround, IEvent } from "./interfaces/interfaces";
import { IUser } from './interfaces/interfaces';

export const fakeGrounds: IGround[] = Array.from({ length: 20 }).map((_, i) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

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

  const feedbacks = [
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

  return {
    id,
    name: `Ground ${i + 1} - Football`,
    coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
    description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
    createdAt: now,
    updatedAt: now,
    location: {
      lat,
      lng,
      address
    },
    feedbacks
  };
});

export const fakeGrounds2: IGround[] = Array.from({ length: 20 }).map((_, i) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

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

  const feedbacks = [
    {
      id: crypto.randomUUID(),
      userId: `user${(i % 3) + 1}`,
      groundId: id,
      rating: 3 + (i % 3), // 3, 4, or 5
      comment: i % 2 === 0 ? 'Good for basketball!' : 'Could use more benches.',
      createdAt: now,
      updatedAt: now
    }
  ];

  return {
    id,
    name: `Ground ${i + 1} - Basketball`,
    coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
    description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
    createdAt: now,
    updatedAt: now,
    location: {
      lat,
      lng,
      address
    },
    feedbacks
  };
});

export const fakeGrounds3: IGround[] = Array.from({ length: 20 }).map((_, i) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

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

  const feedbacks = [
    {
      id: crypto.randomUUID(),
      userId: `user${(i % 3) + 1}`,
      groundId: id,
      rating: 5,
      comment: 'Perfect for workouts!',
      createdAt: now,
      updatedAt: now
    }
  ];

  return {
    id,
    name: `Ground ${i + 1} - Workout`,
    coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
    description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
    createdAt: now,
    updatedAt: now,
    location: {
      lat,
      lng,
      address
    },
    feedbacks
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
    groundId: 'ground1'
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
    groundId: 'ground2'
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
    category: 'Exhibition'
    // groundId is optional and omitted here
  }
];

export const USERS_MOCK: IUser[] = [
  {
    id: 'user1',
    username: 'john_doe',
    email: 'john.doe@example.com',
    geolocation: '54.6872,25.2797',
    password: 'hashedpassword1',
    createdId: 'admin',
    updatedId: 'admin',
    roles: 'user',
    isEmailConfirmed: true,
    confirmationToken: 'token1'
  },
  {
    id: 'user2',
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    geolocation: '54.6890,25.2765',
    password: 'hashedpassword2',
    createdId: 'admin',
    updatedId: 'admin',
    roles: 'user',
    isEmailConfirmed: false,
    confirmationToken: 'token2'
  },
  {
    id: 'user3',
    username: 'admin_user',
    email: 'admin@example.com',
    geolocation: '54.6900,25.2800',
    password: 'hashedpassword3',
    createdId: 'system',
    updatedId: 'system',
    roles: 'admin',
    isEmailConfirmed: true,
    confirmationToken: 'token3'
  }
];

export const FAKE_GROUND: IGround = {
  id: 'ground1',
  name: 'Vingio Parkas Football Ground',
  coverage: 'Grass',
  description: 'A well-maintained football ground located in the heart of Vilnius, suitable for both amateur and professional matches.',
  createdAt: '2024-06-01T10:00:00Z',
  updatedAt: '2024-06-10T12:00:00Z',
  location: {
    lat: '54.6872',
    lng: '25.2797',
    address: 'Vingio Parkas, Vilnius'
  },
  feedbacks: [
    {
      id: 'f1',
      userId: '1',
      groundId: 'ground1',
      rating: 5,
      comment: 'Great field, very well maintained!',
      createdAt: '2024-06-11T09:00:00Z',
      updatedAt: '2024-06-11T09:00:00Z'
    },
    {
      id: 'f2',
      userId: '2',
      groundId: 'ground1',
      rating: 4,
      comment: 'Nice place, but can get crowded on weekends.',
      createdAt: '2024-06-12T10:00:00Z',
      updatedAt: '2024-06-12T10:00:00Z'
    }
  ]
};