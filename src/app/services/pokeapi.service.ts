import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

export type Region = 'kanto' | 'johto' | 'hoenn' | 'sinnoh' | 'unova' | 'kalos' | 'alola' | 'galar' | 'paldea';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private allPokemons: Pokemon[] = [];

  private regionRanges: { [key in Region]: { start: number; end: number } } = {
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

  constructor(private http: HttpClient) { }

  getAllPokemons(): Observable<Pokemon[]> {
    if (this.allPokemons.length > 0) {
      return of(this.allPokemons);
    }

    return this.http.get<{results: {name: string, url: string}[]}>(`${this.apiUrl}/pokemon?limit=1008`).pipe(
      mergeMap(response => {
        const requests = response.results.map(pokemon => this.getPokemonByName(pokemon.name));
        return forkJoin(requests);
      }),
      map(pokemons => {
        this.allPokemons = pokemons;
        return pokemons;
      }),
      catchError(this.handleError)
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name.toLowerCase()}`).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonByRegion(region: Region): Observable<Pokemon[]> {
    const range = this.regionRanges[region.toLowerCase() as Region];
    if (!range) {
      return throwError(() => new Error('Invalid region'));
    }

    const requests: Observable<Pokemon>[] = [];
    for (let i = range.start; i <= range.end; i++) {
      requests.push(this.getPokemon(i));
    }

    return forkJoin(requests).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon-species/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public isValidRegion(region: string): region is Region {
    return region in this.regionRanges;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof Error) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}