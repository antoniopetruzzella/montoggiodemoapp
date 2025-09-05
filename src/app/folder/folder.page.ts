import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})


export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public dynamicContent:any
  public contenuto: any
  public campi_da_escludere=["progr"];//QUESTO E' L'ARRAY DEI CAMPI CHE ARRIVANO DAL DB MA CHE NON VANNO RAPPRESENTATI
  constructor(private dataService: DataService) {}
  modalVisibile = false;
  imgSelezionata = '';


  ngOnInit() {
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    var section=this.folder
    if (section) {
      this.dataService.getContent(section).subscribe((res: any) => {
        this.contenuto = res.dati;
        console.log("contenuto", this.contenuto)
      });
    }
  }

  apriModal(imgUrl: string) {
  this.imgSelezionata = imgUrl;
  this.modalVisibile = true;
  }

 

}
