import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';

interface Item {
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'items').withConverter({
    toFirestore: (item: Item) => item,
    fromFirestore: (snapshot) => snapshot.data() as Item,
  });
  item$ = collectionData<Item>(this.itemCollection);
}
