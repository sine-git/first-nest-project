import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {

    constructor(private http: HttpService) {

    }
    public getUser(id: number): UserModel {
        let user = new UserModel(1, "Leanne Graham", "Bret", "Sincere@april.biz");
        return user
    }

    async testMethod() {

        const response = await firstValueFrom(this.http.get("https://jsonplaceholder.typicode.com/posts"))

        /*  const observable = new Observable((subscribe) => {
             subscribe.next("Hello");
             console.log('....');
             setTimeout(
                 () => {
                     subscribe.next("Comment vas tu ?");
                     console.log('....');
                 }, 1000
             );
             setTimeout(
                 () => {
                     subscribe.next("Je vais très bien");
                     console.log('....');
                 }, 1000
             );
             setTimeout(
                 () => {
                     subscribe.next("Et toi?");
                     console.log('....');
                 }, 1000
             );
         });
         observable.subscribe((value) => {
             console.log(value);
         }); */
        return response.data;
    }
}
