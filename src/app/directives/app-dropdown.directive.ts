import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector : '[appDropdown]'
})
// This directive helps open nav dropdown
export class AppDropdownDirective{

    constructor( private el: ElementRef) {
    }

    
    // @HostBinding('class.show') 
    isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
      this.toggleDropDown();
    }

    toggleDropDown(){
            for(let child of this.el.nativeElement.children){
                
                if(this.isOpen){
                    child.classList.add('show');
                }else{
                    child.classList.remove('show');
                }
                
            }
    }
}