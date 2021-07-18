import { NgModule } from "@angular/core";
import { AppAutoTrimDirective } from "./app-autoTrim.directive";

@NgModule({
    declarations:[AppAutoTrimDirective],
    exports:[AppAutoTrimDirective],
})
export class TrimDirectiveModule{}