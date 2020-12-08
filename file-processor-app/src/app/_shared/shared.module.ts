import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../_core/services/notification.service';
import { materialModule } from './material.module';



const MODULES: any[] = [
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    materialModule
];

export const SHARED_MODULES_WITH_PROVIDERS: any[] = [];

const PIPES: any[] = [
];

const ENTRY_COMPONENTS: any[] = [
];

const COMPONENTS: any[] = [
    ...ENTRY_COMPONENTS,
];

const DIRECTIVES: any[] = [
];

const PROVIDERS: any[] = [
    NotificationService,
];

@NgModule({
    imports: [
        ...MODULES,
        ...SHARED_MODULES_WITH_PROVIDERS
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    providers: [
        ...PROVIDERS
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...MODULES,
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...ENTRY_COMPONENTS,
    ]
})

export class SharedModule {
}
