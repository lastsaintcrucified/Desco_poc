import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./appMain/components/sign-in/sign-in.component";
import { SignUpComponent } from "./appMain/components/sign-up/sign-up.component";
import { UpdateProfileComponent } from "./appMain/components/update-profile/update-profile.component";
import { UserDashboardComponent } from "./appMain/components/user-dashboard/user-dashboard.component";
import { ListThingsComponent } from "./appMain/components/list-things/list-things.component";
export const Approutes: Routes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "update-profile", component: UpdateProfileComponent },
  { path: "user-dashboard", component: UserDashboardComponent },
  { path: "list-things", component: ListThingsComponent },
  {
    path: "**",
    redirectTo: "/authentication/404",
  },
];

// {
// 		path: '',
// 		component: FullComponent,
// 		children: [
// 			{ path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
// 			{
// 				path: 'dashboard',
// 				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
// 			},
// 			{
// 				path: 'starter',
// 				loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
// 			},
// 			{
// 				path: 'component',
// 				loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
// 			},
// 			{ path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
// 			{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
// 			{ path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
// 			{ path: 'tables', loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
// 			{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
// 			{
// 				path: 'widgets',
// 				loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
// 			},
// 			{ path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
// 			{
// 				path: 'timeline',
// 				loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
// 			},
// 			{
// 				path: 'extra-component',
// 				loadChildren:
// 					() => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
// 			},
// 			{ path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
// 			{ path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule) },
// 			{ path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
// 			{
// 				path: 'sample-pages',
// 				loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
// 			},
// 			{
// 				path: 'sub-child',
// 				loadChildren: () => import('./sub-child/sub-child.module').then(m => m.SubchildModule)
// 			}
// 		]
// 	},
// 	{
// 		path: '',
// 		component: BlankComponent,
// 		children: [
// 			{
// 				path: 'authentication',
// 				loadChildren:
// 					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
// 			}
// 		]
// 	}
