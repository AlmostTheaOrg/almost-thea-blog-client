import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver
} from "@angular/core";
import {
  ImageAddComponent,
  ImageDetailsComponent,
  ImageEditComponent,
  ImageDeleteComponent
} from "../index";

@Component({
  selector: "dynamic-component",
  entryComponents: [
    ImageAddComponent,
    ImageDetailsComponent,
    ImageEditComponent,
    ImageDeleteComponent
  ],
  template: `
    <div #dynamicComponentContainer></div>
  `
})
export class DynamicComponent {
  currentComponent = null;

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input()
  set componentData(data: { component: any; inputs: any }) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map(inputName => {
      return { provide: inputName, useValue: data.inputs[inputName] };
    });
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(
      resolvedInputs,
      this.dynamicComponentContainer.parentInjector
    );

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // We can destroy the old component is we like by calling destroy
    this.destroy();

    this.currentComponent = component;
  }

  /**
   * destroy
   */
  public destroy() {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }

  constructor(private resolver: ComponentFactoryResolver) {}
}
