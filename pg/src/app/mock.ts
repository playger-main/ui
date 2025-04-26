import { IGround, IEvent } from "./interfaces/interfaces";

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
    }
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
    }
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
    }
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