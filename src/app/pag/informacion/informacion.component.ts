import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from '../../service/pokeapi.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {

  detalles: any = { id: 0, nombre: '', imagen: '', gif1: '', gif2: ''};
  habilidades: string[] = [];
  descripcion: string = '';

  constructor(private router: ActivatedRoute, private pokeApi: PokeapiService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const nombre = params['nombre'];
      const id = params['id'];

      this.detallesPokemon(nombre);
      this.descripcionPokemon(nombre);
    });
  }

  detallesPokemon(nombre: string) {
    this.pokeApi.getPokemon(nombre).subscribe((data: any) => {
      this.detalles.id = data.id;
      this.detalles.nombre = nombre;

      if (data.sprites.other.dream_world.front_default != null) {
        this.detalles.imagen = data.sprites.other.dream_world.front_default;
      } else {
        this.detalles.imagen = data.sprites.front_default;
      }

      this.detalles.gif1 = data.sprites.versions['generation-v']['black-white'].animated.front_default;
      this.detalles.gif2 = data.sprites.versions['generation-v']['black-white'].animated.front_shiny;

      this.habilidades = data.abilities.map((habilidad: any) => habilidad.ability.name);
      
      console.log(this.detalles);
      console.log(this.habilidades);
    });
  }

  descripcionPokemon(nombre: string) {
    this.pokeApi.getPokemonDescripcion(nombre).subscribe((data: any) => {
      const esDescripcion = data.flavor_text_entries.find((entry: any) => entry.language.name === 'es');
      if (esDescripcion) {
        this.descripcion = esDescripcion.flavor_text;
      } else {
        this.descripcion = 'No hay descripción en español';
      }
    });
  }

}
