import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileValidator } from './directives/file-input.directive';
import { FileValueAccessorDirective } from './directives/file-control-value-accessor.directive';
import { NotificationComponent } from './notification/notification.component';
import { NotificationActions } from './notification/notification.actions';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotificationComponent,
		FileValidator,
		FileValueAccessorDirective,
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		NotificationComponent,
		FileValidator,
		FileValueAccessorDirective
	],
	providers: [
		NotificationActions
	]
})
export class SharedModule { }
