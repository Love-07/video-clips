import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabComponent } from './tab/tab.component';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';


@NgModule({
  declarations: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    AlertComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent
  ],
})
export class SharedModule { }
