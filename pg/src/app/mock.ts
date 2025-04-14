import { IGround } from "./interfaces/interfaces";


export const fakeGrounds: IGround[] = Array.from({ length: 20 }).map((_, i) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    return {
      id,
      name: `Ground ${i + 1} - Vilnius`,
      coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
      description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
      createdAt: now,
      updatedAt: now,
      locationId: `vilnius-loc-${i + 1}`
    };
  });
  


export const fakeListFavKindSport = [{icon: 'football', type: 'Football'}, {icon: 'basketball', type: 'Basketball'}, {icon: 'barbell', type: 'Workout'}]