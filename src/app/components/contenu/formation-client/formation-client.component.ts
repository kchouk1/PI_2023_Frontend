import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Formation } from 'src/app/_models/formation';
import { FormationService } from 'src/app/_services/wajdi/formation.service';

@Component({
  selector: 'app-formation-client',
  templateUrl: './formation-client.component.html',
  styleUrls: ['./formation-client.component.scss']
})
export class FormationClientComponent implements OnInit {

    formations: Formation[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];
  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe(
        (data: any) => {
          this.formations = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
      
      this.sourceCities = [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' }];

    this.targetCities = [];

    this.orderCities = [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' }];

    this.sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];
}

onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onFilter(dv: any[], event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    dv.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    // Use the filtered data as needed
  }

}

      
      
      
      
      
  


