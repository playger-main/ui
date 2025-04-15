import { IGround } from "./interfaces/interfaces";


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
    name: `Ground ${i + 1} - Vilnius-Football`,
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
    name: `Ground ${i + 1} - Vilnius-Basketball`,
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
    name: `Ground ${i + 1} - Vilnius-Workout`,
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