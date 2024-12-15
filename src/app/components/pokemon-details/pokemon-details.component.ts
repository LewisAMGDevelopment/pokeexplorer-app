import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeapiService } from '../../services/pokeapi.service';
import { Pokemon } from '../../models/pokemon.model';

interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemonId!: number;
  pokemon: Pokemon | null = null;
  description: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.fetchPokemonDetails();
  }

  fetchPokemonDetails() {
    this.loading = true;
    this.error = null;
    this.pokeapiService.getPokemon(this.pokemonId).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.fetchPokemonDescription();
      },
      error: (err) => {
        this.error = 'Failed to load Pokémon details. Please try again.';
        this.loading = false;
      }
    });
  }

  fetchPokemonDescription() {
    this.pokeapiService.getPokemonSpecies(this.pokemonId).subscribe({
      next: (data: PokemonSpecies) => {
        const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        this.description = englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
        this.loading = false;
      },
      error: (err) => {
        this.description = 'No description available.';
        this.loading = false;
      }
    });
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };

    return typeColors[type.toLowerCase()] || 'bg-gray-400';
  }
}