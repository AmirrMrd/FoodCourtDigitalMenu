import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AdminComponent } from './Panel/admin.component';
import { EditComponent } from './branches/edit-branch/edit-branch.component';
import { AddBranchComponent } from './branches/add-branch/add-branch.component';
import { RegisterComponent } from './account/register/register.component';
import { ManageBranchesComponent } from './branches/manage-branches/manage-branches.component';
import { ManageAccountsComponent } from './account/manage-accounts/manage-accounts.component';
import { RestApiService } from './Services/rest-api.service';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AdminComponent,
    EditComponent,
    AddBranchComponent,
    ManageBranchesComponent,
    ManageAccountsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path : 'admin' , component : LoginComponent},
      { path : 'dashboard' , component : AdminComponent , children : [
        {path : 'manageBranches' , component : ManageBranchesComponent},
        {path : 'add-branch' , component : AddBranchComponent},
        {path : 'manageAccount' , component : ManageAccountsComponent}
      ]},
      {path : 'register' , component : RegisterComponent}
      

    ])
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// const routes: Routes = [
//   { path : '' , component : HomeComponent },
//   { path : 'login' , component : LoginComponent },
//   { path : 'admin' , component : AdminComponent, canActivate : [AuthGuard] , children : [
//     {path : 'manageAccount' , component : ManageAccountsComponent},
//     {path : 'manageBranches' , component : ManageBranchesComponent},
//     {path : 'register' , component : RegisterComponent},
//     {path : 'add-branch' , component : AddBranchComponent}
//   ]},
//   { path : '**' , component : NotFoundComponent }

  
// ];
