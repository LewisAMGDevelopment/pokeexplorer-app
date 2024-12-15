import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { RegionMapComponent } from './components/region-map/region-map.component';
import { PokeapiService, Region } from './services/pokeapi.service';
import { Pokemon } from './models/pokemon.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PokemonCardComponent, PokemonDetailsComponent, RegionMapComponent]
})
export class AppComponent implements OnInit {
  title = 'PokeExplorer';
  allPokemons: Pokemon[] = [];
  displayedPokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  loading = false;
  error: string | null = null;
  selectedRegion: Region | null = null;
  searchPerformed = false;
  searchTerm: string = '';
  selectedType: string = '';

  constructor(
    private pokeapiService: PokeapiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAllPokemons();
  }

  loadAllPokemons() {
    this.loading = false;
    this.error = null;
    this.pokeapiService.getAllPokemons().subscribe({
      next: (pokemons) => {
        this.allPokemons = pokemons;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load all Pokémon. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterPokemons(searchTerm, this.selectedType);
  }

  onTypeFilter(type: string) {
    this.selectedType = type;
    this.filterPokemons(this.searchTerm, type);
  }

  onRegionSelect(region: string) {
    if (this.pokeapiService.isValidRegion(region)) {
      this.selectedRegion = region as Region;
      this.filterPokemons(this.searchTerm, this.selectedType);
    } else if (region === '') {
      this.selectedRegion = null;
      this.filterPokemons(this.searchTerm, this.selectedType);
    } else {
      console.error(`Invalid region: ${region}`);
    }
  }

  filterPokemons(searchTerm: string = '', type: string = '') {
    if (!this.allPokemons.length) return;
    
    if (!searchTerm && !type && !this.selectedRegion) {
      this.searchPerformed = false;
      this.displayedPokemons = [];
      return;
    }
    
    this.searchPerformed = true;
    
    this.displayedPokemons = this.allPokemons.filter(pokemon => {
      const matchesSearch = searchTerm ? (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pokemon.id.toString().includes(searchTerm)) : true;
      const matchesType = type ? pokemon.types.some(t => t.type.name === type) : true;
      const matchesRegion = this.selectedRegion ? this.isInRegion(pokemon.id, this.selectedRegion) : true;
      return matchesSearch && matchesType && matchesRegion;
    });

    const pokemonCards = document.getElementById('pokemon-cards');
    if (pokemonCards) {
      pokemonCards.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isInRegion(pokemonId: number, region: Region): boolean {
    const regionRanges: { [key in Region]: { start: number; end: number } } = {
      kanto: { start: 1, end: 151 },
      johto: { start: 152, end: 251 },
      hoenn: { start: 252, end: 386 },
      sinnoh: { start: 387, end: 493 },
      unova: { start: 494, end: 649 },
      kalos: { start: 650, end: 721 },
      alola: { start: 722, end: 809 },
      galar: { start: 810, end: 898 },
      paldea: { start: 906, end: 1008 }
    };

    const range = regionRanges[region];
    return pokemonId >= range.start && pokemonId <= range.end;
  }

  onSelectPokemon(pokemonId: number) {
    this.selectedPokemon = this.allPokemons.find(p => p.id === pokemonId) || null;
  }

  onCloseDetails() {
    this.selectedPokemon = null;
  }
}