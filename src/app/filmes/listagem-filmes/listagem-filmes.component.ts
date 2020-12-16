import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = `http://www.cooperai.com.br/imagens/sem-foto.gif`;

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  }
  filmes : Filme[] = [];
  filtrosListagem : FormGroup;
  generos : Array<string>;
  
  constructor(private filmesService: FilmesService,
              private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsultar();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsultar();
    });



    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Terror",
      "Ficção Científica",
      "Comédia",
      "Drama",
    ];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void{
     this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
    .subscribe((filmes: Filme[]) => this.filmes.push(...filmes)); 
  }

  private resetarConsultar(): void{
this.config.pagina = 0;
this.filmes = [];
this.listarFilmes();
  }
}
