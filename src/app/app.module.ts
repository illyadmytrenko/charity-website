import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { register } from 'swiper/element/bundle';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { ActiveLinkService } from 'src/components/services/active-link.service';
import { ModalRegisterComponent } from 'src/components/modal-register/modal-register.component';
import { ModalLoginComponent } from 'src/components/modal-login/modal-login.component';
import { DonationHistoryComponent } from 'src/components/donationsHistory/donationsHistory.component';
import { SettingsComponent } from 'src/components/settings/settings.component';
import { NavigationComponent } from 'src/components/navigation/navigation.component';
import { CausesComponent } from 'src/components/causes/causes.component';
import { PaginationComponent } from 'src/components/pagination/pagination.component';
import { DonationCardComponent } from 'src/components/donation-card/donation-card.component';
import { DonatePageComponent } from 'src/components/donate-page/donate-page.component';
import { AboutComponent } from 'src/components/about/about.component';
import { HomeComponent } from 'src/components/home/home.component';
import { RoadmapComponent } from 'src/components/roadmap/roadmap.component';
import { StatsComponent } from 'src/components/stats/stats.component';
import { ReviewComponent } from 'src/components/review/review.component';
import { BecomeVolunteerComponent } from 'src/components/become-volunteer/become-volunteer.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { GalleryComponent } from 'src/components/gallery/gallery.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { FAQComponent } from 'src/components/faq/faq.component';
import { DonationService } from 'src/components/services/donate.service';

register();

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'donationsHistory', component: DonationHistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'causes', component: CausesComponent },
  { path: 'donatePage', component: DonatePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'becomeVolunteer', component: BecomeVolunteerComponent },
  { path: 'FAQ', component: FAQComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalRegisterComponent,
    ModalLoginComponent,
    DonationHistoryComponent,
    SettingsComponent,
    NavigationComponent,
    CausesComponent,
    PaginationComponent,
    DonationCardComponent,
    DonatePageComponent,
    FooterComponent,
    GalleryComponent,
    AboutComponent,
    HomeComponent,
    RoadmapComponent,
    StatsComponent,
    ReviewComponent,
    BecomeVolunteerComponent,
    ContactComponent,
    FAQComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    SweetAlert2Module.forChild(),
    ClipboardModule,
  ],
  providers: [ActiveLinkService, DonationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
