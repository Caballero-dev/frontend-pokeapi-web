import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  public getColores() {
    return this.http.get(this.url + 'pokemon-color');
  }

  public getColor(color: string) {
    return this.http.get(this.url + 'pokemon-color/' + `${color}`);
  }

  public getPokemon(nombre: string) {
    return this.http.get(this.url + 'pokemon/' + `${nombre}`);
  }

  public getPokemonDescripcion(nombre: string) {
    return this.http.get(this.url + 'pokemon-species/' + `${nombre}`);
  }
}
