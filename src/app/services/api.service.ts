import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiServices {

    api_url = 'https://fastapi-savefull.herokuapp.com/';
    
    constructor() { }

}