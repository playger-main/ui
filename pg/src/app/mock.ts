import { IGround } from "./interfaces/interfaces";


export const fakeGrounds: IGround[] = Array.from({ length: 20 }).map((_, i) => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    return {
      id,
      name: `Ground ${i + 1} - Vilnius-Football`,
      coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
      description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
      createdAt: now,
      updatedAt: now,
      locationId: `vilnius-loc-${i + 1}`
    };
  });


export const fakeGrounds2: IGround[] = [
  {
    id: crypto.randomUUID(),
    name: 'Ground A',
    coverage: 'Grass',
    description: 'Located near Vingis Park with natural turf.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-vingis-1'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground B',
    coverage: 'Synthetic',
    description: 'Close to Ozas Park, used for 5-a-side matches.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-ozas-2'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground C',
    coverage: 'Gravel',
    description: 'Behind Vilnius Tech building, simple and solid.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-vilniustech-3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground D',
    coverage: 'Concrete',
    description: 'Šeškinė court, suitable for futsal or streetball.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-seskine-4'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground E',
    coverage: 'Synthetic',
    description: 'Antakalnis school field with lights and stands.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-antakalnis-5'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground F',
    coverage: 'Grass',
    description: 'Field near Belmontas park, scenic and green.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-belmontas-6'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground G',
    coverage: 'Synthetic',
    description: 'New court in Fabijoniškės for evening games.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-fabijoniskes-7'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground H',
    coverage: 'Gravel',
    description: 'Behind Akropolis mall, often used for training.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-akropolis-8'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground I',
    coverage: 'Concrete',
    description: 'Compact court near Žirmūnai bridge.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-zirmunai-9'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground J',
    coverage: 'Synthetic',
    description: 'Modern turf next to the Siemens Arena.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-siemens-10'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground K',
    coverage: 'Grass',
    description: 'Old-style football pitch in Lazdynai.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-lazdynai-11'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground L',
    coverage: 'Synthetic',
    description: 'Next to Vilnius University dormitories.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-vudorms-12'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground M',
    coverage: 'Concrete',
    description: 'Community court near Paneriai forest.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-paneriai-13'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground N',
    coverage: 'Gravel',
    description: 'Between Naujininkai warehouses.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-naujininkai-14'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground O',
    coverage: 'Synthetic',
    description: 'Open space near Green Lakes area.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-greenlakes-15'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground P',
    coverage: 'Grass',
    description: 'Next to Verkiai regional park.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-verkiai-16'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground Q',
    coverage: 'Concrete',
    description: 'Hard court behind Litexpo center.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-litexpo-17'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ground R',
    coverage: 'Synthetic',
    description: 'Newly renovated pitch in Pilaitė.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locationId: 'vilnius-pilaite-18'
  },

];

export const fakeGrounds3: IGround[] = Array.from({ length: 20 }).map((_, i) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id,
    name: `Ground ${i + 1} - Workout`,
    coverage: ['Grass', 'Gravel', 'Concrete', 'Synthetic'][i % 4],
    description: `This is a description for Ground ${i + 1} located in Vilnius. It features ${['great drainage', 'multi-use fields', 'evening lighting', 'seating areas'][i % 4]}.`,
    createdAt: now,
    updatedAt: now,
    locationId: `vilnius-loc-${i + 1}`
  };
});

  




  export const fakeListFavKindSport = [{icon: 'football', type: 'Football'}, {icon: 'basketball', type: 'Basketball'}, {icon: 'barbell', type: 'Workout'}]