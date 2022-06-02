import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiServices {

    api_url = 'https://recipe-puspendu.herokuapp.com/';
    
    constructor() { }

}