import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./appMain/components/sign-in/sign-in.component";
import { SignUpComponent } from "./appMain/components/sign-up/sign-up.component";
import { UpdateProfileComponent } from "./appMain/components/update-profile/update-profile.component";
import { UserDashboardComponent } from "./appMain/components/user-dashboard/user-dashboard.component";
import { ListItemComponent } from "./appMain/components/list-item/list-item.component";
import { ListUsersComponent } from "./appMain/components/list-users/list-users.component";
import { ListLandlordsComponent } from "./appMain/components/list-landlords/list-landlords.component";
import { ListTenantsComponent } from "./appMain/components/list-tenants/list-tenants.component";
import { ListSuperAdminComponent } from "./appMain/components/list-super-admin/list-super-admin.component";
import { ListAdminComponent } from "./appMain/components/list-admin/list-admin.component";
import { BillPayComponent } from "./appMain/components/bill-pay/bill-pay.component";

import { AuthGuard } from "./appMain/components/guard/auth.guard";
export const Approutes: Routes = [
  { path: "", redirectTo: "/sign-up", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  {
    path: "update-profile",
    component: UpdateProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user-dashboard",
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "list-item", component: ListItemComponent, canActivate: [AuthGuard] },
  {
    path: "list-users",
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-landlords",
    component: ListLandlordsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-tenants",
    component: ListTenantsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-super-admin",
    component: ListSuperAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-admin",
    component: ListAdminComponent,
    canActivate: [AuthGuard],
  },
  { path: "bill-pay", component: BillPayComponent },
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
