import {animate, style, transition, trigger} from '@angular/animations'

export const fadeInOutAnimation = trigger('fadeInOut', [
    transition(':enter', [
        style({opacity: 0, transform: 'scale(0)'}),
        animate('100ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
    ]),
    transition(':leave', [
        animate('100ms ease-in', style({opacity: 0, transform: 'scale(0)'}))
    ])
])

export const slideFromLeftAnimation = trigger('slideFromLeft', [
    transition(':enter', [
        style({opacity: 0, transform: 'translate(-10%)'}),
        animate('100ms ease-out', style({opacity: 1, transform: 'translate(0)'}))
    ]),
    transition(':leave', [
        animate('100ms ease-in', style({opacity: 0}))
    ])
])
