import {
  Component,
  Input,
  NgModule,
  EventEmitter,
  Output
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: "joke",
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{ data.setup }}</h4>
      <p class="card-text" [hidden]="data.hide">{{ data.punchline }}</p>
      <button class="btn btn-warning" (click)="data.toggle()">
        Dime
      </button>
      <button class="btn btn-danger" (click)="deleteItem()">
        Eliminar
      </button>
    </div>
  `
})
class JokeComponent {
  @Input("joke") data: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();

  deleteItem() {
    this.jokeDeleted.emit(this.data);
  }
}

@Component({
  selector: "joke-list",
  template: `
    <joke-form (jokeCreated)="addJoke($event)"></joke-form>
    <joke
      *ngFor="let j of jokes"
      [joke]="j"
      (jokeDeleted)="deleteJoke($event)"
    ></joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke(
        "¿Qué dijo el queso cuando se miró en el espejo?",
        "Hola-yo (Halloumi)"
      ),
      new Joke(
        "¿Qué tipo de queso usas para disfrazar un caballo pequeño?",
        "Máscara-a-pony (Mascarpone)"
      ),
      new Joke(
        "Un niño me lanzó un trozo de queso cheddar.",
        "Pensé 'Eso no es muy maduro'"
      )
    ];
  }

  addJoke(joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke) {
    let indexToDelete = this.jokes.indexOf(joke);

    if (indexToDelete !== -1) {
      this.jokes.splice(indexToDelete, 1);
    }
  }
}

@Component({
  selector: "joke-form",
  template: `
    <div class="card card-block">
      <h4 class="card-title">Crear una broma</h4>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Ingrese la pregunta"
          #setup
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Ingrese la respuesta"
          #punchline
        />
      </div>
      <button
        type="button"
        class="btn btn-primary"
        (click)="createJoke(setup.value, punchline.value)"
      >
        Crear
      </button>
    </div>
  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}

@Component({
  selector: "app",
  template: `
    <joke-list></joke-list>
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    JokeComponent,
    JokeFormComponent,
    JokeListComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
