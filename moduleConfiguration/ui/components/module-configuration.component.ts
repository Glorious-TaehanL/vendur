import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import {
  DataService,
} from '@vendure/admin-ui/core';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { parse } from 'graphql';
import { notify } from '@vendure/ui-devkit';

@Component({
  selector: 'module-configuration-component',
  styleUrls: ['./module-configuration.component.scss'],
  templateUrl: './module-configuration.component.html',
})

export class ModuleConfigurationComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  module: { name: string; status: boolean}[];
  status: boolean;
  test: any[];
  baseUrl: string;


  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private locationStrategy: LocationStrategy,
    ) {
      this.module = [];
    }

  ngOnInit() {
    this.baseUrl = location.origin;
      
    this.dataService.query<{
      getAllModules: {
        name: string;
        status: boolean;
      }[];
    }>(
      parse(
        `query {
          getAllModules {
            name
            status
          }
        }`
      )
    )
    .single$.toPromise()
    .then((response) => {
      const res = <
      {
        getAllModules: {
          name: string;
          status: boolean;
        }[];
      }>response;

      this.module = res.getAllModules.map((m) => ({
        name: m.name,
        status: m.status
      }));
    })
    .catch((e) => {
      notify({
        message: "Modules couldn't be loaded. Check the console.",
        type: "error",
      });
      console.error(e);
    });
  }

  ngOnDestroy(){
    
  }

  updateModule() {
    if(this.module) {
      this.dataService
      .mutate<
        {
          updateModule: boolean;
        },
        { name: string[]; status: boolean[];}
      >(
        parse(
          `mutation updateModules($name: [String!]!, $status: [Boolean!]!) {
            updateModule(name: $name, status: $status)
          }`
        ),
        {
          name: this.module.map((m) => m.name),
          status: this.module.map((m) => m.status)
        }
      )
      .toPromise()
      .then(() => {
        notify({
          message: "Updated successfully",
          type: 'success',
        });
      })
      .catch((e) => {
        notify({
          message: "Module Status couldn't be updated. Check the console.",
          type: "error",
        });
        console.error(e);
      });
    }
  }
}
