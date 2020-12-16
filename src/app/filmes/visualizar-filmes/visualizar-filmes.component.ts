import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = `http://www.cooperai.com.br/imagens/sem-foto.gif`;
  filme : Filme;
  id : number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmeService: FilmesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void{
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  excluir(): void{
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha  certeza que deseja excluir, clique no botão OK',
        possuirBtnFechar: true,
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn'
      } as Alerta, 
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmeService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }
  private visualizar(): void{
    this.filmeService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }

}
