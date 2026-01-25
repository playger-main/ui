// import { ICurrentUser, IEvent, IGround, IUser } from './interfaces/interfaces';

// // -------------------- GROUNDS --------------------

// export const fakeGrounds: IGround[] = Array.from({ length: 20 }).map((_, i) => {
//   const id = (i + 1).toString();

//   const now = new Date();
//   const createdAt = new Date(now.getTime() - i * 86400000).toISOString();
//   const updatedAt = new Date(now.getTime() - i * 43200000).toISOString();

//   const addresses = [
//     'Vingio Parkas, Vilnius',
//     'Ozo g. 18, Vilnius',
//     'Antakalnio g. 11, Vilnius',
//     'Gedimino pr. 9, Vilnius',
//     'Naugarduko g. 24, Vilnius',
//   ];
//   const address = addresses[i % addresses.length];

//   // ✅ number (под твой IGround)
//   const lat = 54.6872 + i * 0.0015;
//   const lng = 25.2797 + i * 0.0013;

//   // ✅ kindofsport: string[]
//   const sports = ['football', 'basketball', 'workout'];
//   const kindofsport = [sports[i % sports.length]];

//   // ✅ coverage: string[]
//   const coverages = ['grass', 'gravel', 'concrete', 'synthetic'];
//   const coverage = [coverages[i % coverages.length]];

//   const feature = [
//     'great drainage',
//     'multi-use fields',
//     'evening lighting',
//     'seating areas',
//   ][i % 4];
//   const description = `A ${kindofsport[0]} ground located at ${address}. Known for its ${feature}.`;

//   const avatars = [
//     'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//     'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
//     'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
//     'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
//     'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
//   ];
//   const avatar = avatars[i % avatars.length];

//   // mock ratings
//   const avgRating = Number(((i % 5) + 1 - (i % 2) * 0.2).toFixed(2));
//   const isFavorite = i % 3 === 0;

//   return {
//     id,
//     name: `Ground ${i + 1}`,
//     description,
//     address,

//     kindofsport,
//     coverage,

//     geolocation: { lat, lng },

//     createdAt,
//     updatedAt,

//     eventsCount: i % 4,
//     isFavorite,
//     avgRating,

//     avatar,
//   };
// });

// // -------------------- FAV SPORTS --------------------

// export const fakeListFavKindSport = [
//   { icon: 'football', type: 'Football' },
//   { icon: 'basketball', type: 'Basketball' },
//   { icon: 'barbell', type: 'Workout' },
// ];

// // -------------------- EVENTS --------------------

// export const EVENTS_MOCK: IEvent[] = [
//   {
//     id: '1',
//     name: 'Spring Festival',
//     description: 'A festival to celebrate the arrival of spring.',
//     date: '2025-06-10',
//     startTime: '10:00',
//     duration: '120',
//     createdAt: Date.now() - 10 * 86400000,
//     updatedAt: Date.now() - 9 * 86400000,
//     groundId: fakeGrounds[0].id, // если в IEvent есть groundId
//   },
//   {
//     id: '2',
//     name: 'Tech Conference',
//     description: 'Annual technology conference with speakers from around the world.',
//     date: '2025-07-15',
//     startTime: '09:00',
//     duration: '480',
//     createdAt: Date.now() - 20 * 86400000,
//     updatedAt: Date.now() - 19 * 86400000,
//     groundId: fakeGrounds[1].id,
//   },
//   {
//     id: '3',
//     name: 'Art Expo',
//     description: 'Exhibition of modern art from local artists.',
//     date: '2025-08-05',
//     startTime: '11:00',
//     duration: '180',
//     createdAt: Date.now() - 30 * 86400000,
//     updatedAt: Date.now() - 29 * 86400000,
//     groundId: fakeGrounds[2].id,
//   },
// ];


// // -------------------- USERS --------------------

// export const USERS_MOCK: IUser[] = [
//   {
//     id: 'user1',
//     username: 'john_doe',
//     email: 'john.doe@example.com',
//     geolocation: {
//       lat: 54.6872,
//       lng: 25.2797,
//       address: 'Gedimino pr. 9, Vilnius',
//     } as any,
//     createdAt: '2024-01-01T09:00:00Z',
//     updatedAt: '2024-05-01T10:00:00Z',
//     roles: 'user',
//     isEmailConfirmed: true,
//     favoriteGroundIds: ['1', '3'],
//     listOrganizeEvents: ['1', '4'],
//     listParticipateEvents: ['2', '5'],
//     listFutureEvents: ['5'],
//   },
//   {
//     id: 'user2',
//     username: 'sandra_dev',
//     email: 'sandra.dev@example.com',
//     geolocation: {
//       lat: 54.689,
//       lng: 25.2765,
//       address: 'Ozo g. 18, Vilnius',
//     } as any,
//     createdAt: '2023-11-10T12:00:00Z',
//     updatedAt: '2024-05-05T14:00:00Z',
//     roles: 'admin',
//     isEmailConfirmed: true,
//     favoriteGroundIds: ['2'],
//     listOrganizeEvents: ['5'],
//     listParticipateEvents: ['1'],
//     listFutureEvents: ['2'],
//   },
//   {
//     id: 'user3',
//     username: 'julia_sporty',
//     email: 'julia@example.com',
//     geolocation: {
//       lat: 54.69,
//       lng: 25.28,
//       address: 'Naugarduko g. 24, Vilnius',
//     } as any,
//     createdAt: '2023-09-20T08:30:00Z',
//     updatedAt: '2024-04-10T09:15:00Z',
//     roles: 'organizer',
//     isEmailConfirmed: false,
//     favoriteGroundIds: [],
//     listOrganizeEvents: ['3'],
//     listParticipateEvents: ['2'],
//     listFutureEvents: ['3'],
//   },
//   {
//     id: 'user4',
//     username: 'martynas_fit',
//     email: 'martynas.fit@example.com',
//     geolocation: {
//       lat: 54.6881,
//       lng: 25.2789,
//       address: 'Vingio Parkas, Vilnius',
//     } as any,
//     createdAt: '2023-12-15T07:45:00Z',
//     updatedAt: '2024-03-01T08:00:00Z',
//     roles: 'user',
//     isEmailConfirmed: true,
//     favoriteGroundIds: ['4', '5'],
//     listOrganizeEvents: [],
//     listParticipateEvents: ['1', '3'],
//     listFutureEvents: [],
//   },
//   {
//     id: 'user5',
//     username: 'greta_event',
//     email: 'greta.events@example.com',
//     geolocation: {
//       lat: 54.6911,
//       lng: 25.2771,
//       address: 'Antakalnio g. 11, Vilnius',
//     } as any,
//     createdAt: '2024-02-10T10:00:00Z',
//     updatedAt: '2024-05-10T12:00:00Z',
//     roles: 'organizer',
//     isEmailConfirmed: true,
//     favoriteGroundIds: ['2', '3'],
//     listOrganizeEvents: ['5'],
//     listParticipateEvents: ['4'],
//     listFutureEvents: ['5'],
//   },
// ];

// // -------------------- CURRENT USER --------------------

// export const currentUser: ICurrentUser = {
//   id: '1',
//   username: 'john_doe',
//   email: 'john.doe@example.com',
//   geolocation: {
//     lat: 54.6872,
//     lng: 25.2797,
//     address: 'Gedimino pr. 9, Vilnius',
//   } as any,
//   password: 'hashedpassword1',
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   roles: 'user',
//   isEmailConfirmed: true,
//   confirmationToken: 'token1',
//   favoriteGroundIds: ['ground1', 'ground3', 'ground7'],
//   listOrganizeEvents: [],
//   listParticipateEvents: [],
// };
