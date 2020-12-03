import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {

  }
  
  setItem(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }


  getItem(key: any, defaultValue: any) {
    if (localStorage.getItem(key) != undefined && localStorage.getItem(key) != 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return undefined;
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
