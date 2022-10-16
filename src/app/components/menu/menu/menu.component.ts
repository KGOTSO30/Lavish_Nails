import { Component, OnInit, Input } from '@angular/core';
import { ProductCategory } from '../models';
import { Hero } from '../hero';
import { HEROES } from '../models';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  myDocData: any;
  data: any;
  savedChanges: boolean = false;
  dataLoading: boolean = false;
  error: boolean = false;
  errorMessage!: String;
  currentDate: any;

  heroes = HEROES;
  selectedHero?: Hero;

  @Input()
    menu: ProductCategory[] = []
  constructor(private auth: AuthService,) { }

  ngOnInit(): void {
  }
  setData(formData: any) {
    // formData.tags = formData.tags.split(',');
    
  
         
      this.auth.setNewAppDoc('Store/Lavish/user-carts', formData, this.selectedHero?.name,this.selectedHero?.id).then((res: any) => {
          this.savedChanges = true;
          this.dataLoading = false;
      }).catch((error: { message: String; }) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }

  updateData(formData: any) {
    // formData.tags = formData.tags.split(',');
     if (confirm("Are you sure want to update this record ?")) {
         this.dataLoading = true;
         this.auth.updateAppDoc('Store/Lavish/user-carts', formData, formData._id,this.selectedHero?.name, this.selectedHero?.id).then((res) => {
             this.error = false;
             this.errorMessage = "";
             this.dataLoading = false;
             this.savedChanges = true;
         }).catch(error => {
             this.error = true;
             this.errorMessage = error.message;
             this.dataLoading = false;
         });
     }
   }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
