import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PokemonType {
  name: string;
  iconPath: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class NavbarComponent {
  @Input() searchTerm: string = '';
  @Input() selectedType: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() typeFilter = new EventEmitter<string>();
  //searchTerm: string = '';
  isDarkMode: boolean = false;
  //selectedType: string = '';
  selectedIcon: string = 'assets/images/all_types.svg';
  isDropdownOpen: boolean = false;

  pokemonTypes: PokemonType[] = [
    { name: 'normal', iconPath: 'assets/images/normal_type.svg' },
    { name: 'fire', iconPath: 'assets/images/fire_type.svg' },
    { name: 'water', iconPath: 'assets/images/water_type.svg' },
    { name: 'electric', iconPath: 'assets/images/electric_type.svg' },
    { name: 'grass', iconPath: 'assets/images/grass_type.svg' },
    { name: 'ice', iconPath: 'assets/images/ice_type.svg' },
    { name: 'fighting', iconPath: 'assets/images/fighting_type.svg' },
    { name: 'poison', iconPath: 'assets/images/poison_type.svg' },
    { name: 'ground', iconPath: 'assets/images/ground_type.svg' },
    { name: 'flying', iconPath: 'assets/images/flying_type.svg' },
    { name: 'psychic', iconPath: 'assets/images/psychic_type.svg' },
    { name: 'bug', iconPath: 'assets/images/bug_type.svg' },
    { name: 'rock', iconPath: 'assets/images/rock_type.svg' },
    { name: 'ghost', iconPath: 'assets/images/ghost_type.svg' },
    { name: 'dragon', iconPath: 'assets/images/dragon_type.svg' },
    { name: 'dark', iconPath: 'assets/images/dark_type.svg' },
    { name: 'steel', iconPath: 'assets/images/steel_type.svg' },
    { name: 'fairy', iconPath: 'assets/images/fairy_type.svg' }
  ];

  onSearchInput() {
    this.searchTerm = this.searchTerm.trim();
    this.search.emit(this.searchTerm);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectType(type: string) {
    this.selectedType = type;
    this.selectedIcon = type
      ? this.pokemonTypes.find((t) => t.name === type)?.iconPath || ''
      : 'assets/images/all_types.svg';
    this.isDropdownOpen = false;
    this.typeFilter.emit(this.selectedType);
  }


  onTypeChange() {
    this.typeFilter.emit(this.selectedType);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}