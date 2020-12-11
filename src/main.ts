import { Component, Input, NgModule, Output } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { EventEmitter } from "events";

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
      <button class="btn btn-primary" (click)="data.toggle()">
        Dime
      </button>
    </div>
  `
})
class JokeComponent {
  @Input("joke") data: Joke;
}

@Component({
  selector: "joke-list",
  template: `
    <joke-form (jokeCreated)="addJoke($event)"></joke-form>
    <joke *ngFor="let j of jokes" [joke]="j"></joke>
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
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Ingrese la respuesta"
        />
      </div>
      <button type="button" class="btn btn-primary">Crear</button>
    </div>
  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
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
