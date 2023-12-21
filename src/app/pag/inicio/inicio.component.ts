import { Component } from '@angular/core';
import { PokeapiService } from '../../service/pokeapi.service';
import { Router } from '@angular/router';

class pokemones {
  id: number;
  nombre: string;
  imagen: string;

  constructor(id: number,nombre: string, imagen: string) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
  }

}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  NombrePokemones: string[] = [];
  pokemonInf: pokemones[] = [];

  constructor(private pokeApi: PokeapiService, private router: Router) { }

  ngOnInit(): void {
    this.colorNombre('red');
  }

  // Obtine los nombres de los primeros 6 pokemones
  colorNombre(color: string) {
    this.pokemonInf = [];

    this.pokeApi.getColor(color).subscribe((data: any) => {
      this.NombrePokemones = data.pokemon_species.slice(0, 8).map((pokemon: any) => pokemon.name);
      console.log(this.NombrePokemones);

      this.NombrePokemones.forEach(nombre => {
        this.imagenPokemonNombre(nombre);
      });
      console.log(this.pokemonInf);
    });
  }

  // Obtiene la imagen del pokemon
  imagenPokemonNombre(nombre: string) {
    this.pokeApi.getPokemon(nombre).subscribe((data: any) => {
      if (data.sprites.other.dream_world.front_default != null) {
        this.pokemonInf.push(new pokemones(data.id ,nombre, data.sprites.other.dream_world.front_default));
      }else{
        this.pokemonInf.push(new pokemones(data.id ,nombre, data.sprites.front_default));
      }
    });
  }

  // Redirecciona a la pagina de informacion del pokemon
  detallePokemon(nombre: string){
    this.router.navigate(['/informacion', nombre]);
  }

}
