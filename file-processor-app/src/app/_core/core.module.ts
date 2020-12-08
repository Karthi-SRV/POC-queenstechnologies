import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconSnackBarComponent } from './services/icon-snack-bar/icon-snack-bar.component';

const MODULES: any[] = [
    CommonModule,
    HttpClientModule
];

export const CORE_MODULES_WITH_PROVIDERS: any[] = [
];

const PIPES: any[] = [
];

const ENTRY_COMPONENTS: any[] = [
    IconSnackBarComponent
];

const COMPONENTS: any[] = [
    ...ENTRY_COMPONENTS
];

const DIRECTIVES: any[] = [
];



@NgModule({
    imports: [
        ...MODULES,
        ...CORE_MODULES_WITH_PROVIDERS
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    providers: [
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    exports: [
        ...MODULES,
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})

export class CoreModule {
}
