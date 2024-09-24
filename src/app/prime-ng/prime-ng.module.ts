import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {MenubarModule} from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  exports:[
    ButtonModule,
    CardModule,
    FieldsetModule,
    MenubarModule,
    AutoCompleteModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule
  ]
})
export class PrimeNgModule { }
