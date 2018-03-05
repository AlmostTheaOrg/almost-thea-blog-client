import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AuthActions } from '../../auth/auth.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZone } from '@angular/core';
import { AppModule } from '../../app.module';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from 'ng2-redux';
import { AuthenticationService } from '../../services';

// Mock out the NgRedux class with just enough to test what we want.
class MockRedux extends NgRedux<any> {
	constructor() {
		super(null);
	}
	dispatch = () => undefined;
}

class MockAuthenticationService extends AuthenticationService {
	constructor() {
		super(null, null);
	}
}

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async(() => {

		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
			],
			providers: [
				{ provide: AuthActions, useValue: new AuthActions(new MockRedux(), new MockAuthenticationService()) }
			],
			declarations: [FooterComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
