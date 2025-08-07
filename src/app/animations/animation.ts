import { animate, style, transition, trigger } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease', style({ opacity: 1 }))
    ])
]);

export const slideUp = trigger("slideUp", [
    transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate('500ms cubic-bezier(0.25, 1, 0.5, 1)', style({ transform: 'none', opacity: 1 }))
    ])
]);