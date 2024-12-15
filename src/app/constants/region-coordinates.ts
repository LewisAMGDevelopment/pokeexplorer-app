export interface RegionData {
  id: string;
  name: string;
  x: number;
  y: number;
  pokedexNumber: string;
}

export const REGION_COORDINATES: RegionData[] = [
  { id: 'kanto', name: 'Kanto', x: 847, y: 696, pokedexNumber: '2' },
  { id: 'johto', name: 'Johto', x: 709, y: 706, pokedexNumber: '3' },
  { id: 'hoenn', name: 'Hoenn', x: 537, y: 740, pokedexNumber: '4' },
  { id: 'sinnoh', name: 'Sinnoh', x: 970, y: 365, pokedexNumber: '5' },
  { id: 'unova', name: 'Unova', x: 338, y: 523, pokedexNumber: '8' },
  { id: 'kalos', name: 'Kalos', x: 287, y: 337, pokedexNumber: '12' },
  { id: 'alola', name: 'Alola', x: 514, y: 906, pokedexNumber: '16' },
  { id: 'galar', name: 'Galar', x: 149, y: 147, pokedexNumber: '27' },
  { id: 'paldea', name: 'Paldea', x: 156, y: 603, pokedexNumber: '31' }
];