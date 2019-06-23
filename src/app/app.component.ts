import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from '../types';
import { empty } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BootstrapCardsAPI';
  ApiDemo: any;
  serviceData:any;
  item: any;
  language = [];
  name: any;
  searchpoint: any;
  optionsModel: number[];
  myOptions: IMultiSelectOption[] = [];
  newArray:any[] = [];

  settings: IMultiSelectSettings = {
    enableSearch: true,
    displayAllSelectedText: true
  };

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(data => { 
      this.ApiDemo = data;
      this.serviceData = this.ApiDemo;
      //console.log(this.serviceData) ;
      var idCount = 0;
      this.ApiDemo.map(data => {
        this.newArray.push({id: idCount++, name: data.name})
      })
      this.myOptions = this.newArray;
    });
  //   this.myOptions = [
  //     { id: 1, name: 'Option 1' },
  //     { id: 2, name: 'Option 2' },
  // ];
  }
  onSearchChange(value: any) {
    var newData = this.ApiDemo.filter(data=>{
      if(data.name.toLowerCase().includes(value.toLowerCase()) == true){
       return data; 
      }
    })
    this.serviceData = newData;
    //alert(this.ApiDemo.length;
  }
  onChange() {
    if(this.optionsModel.length > 0){
      var newData = [];
      this.optionsModel.map(data =>{
        this.myOptions.map(item =>{
          if(item.id == data){
            this.ApiDemo.map(i=>{
              if(i.name == item.name){
                 newData.push(i)
              }
            })
          }
        })
      });
      this.serviceData = newData;
    }
  }
}
