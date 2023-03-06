import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import {
  DataService,
} from '@vendure/admin-ui/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { ProductList, ProductListOptions } from '@vendure/common/lib/generated-types';
import { Asset, ID, ProductVariant, SortOrder } from '@vendure/core';
import { parse } from "graphql";

@Component({
  selector: 'new-arrivals-component',
  styleUrls: ['./new-arrivals.component.scss'],
  templateUrl: './new-arrivals.component.html',
})

export class NewArrivalsComponent implements OnInit, OnDestroy {

  newArrivals: { id: ID;
    createdAt: Date;
    name: string;
    slug: string;
    featuredAsset: Asset;
    vairants: ProductVariant;  }[];

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService
    .query<
    {
      products: {
        items: {
          id: ID;
          name: string;
        }[];
      };
    },
    { options: { take: number, sort: {createdAt: SortOrder}} }
    >(
      parse(
        `query GetNewArrivals($options: ProductListOptions) {
          products(options: $options){
            items {
              id
              createdAt
              name
              slug
              featuredAsset {
                  id
                  preview
              }
              variants {
                  productId
                  name
                  price
                  priceWithTax
              }
            }
          }
        }`
      ),
      { options: { take: 8, sort: {createdAt: "DESC"} }}
    )
    .single$.toPromise()
    .then((response) => {
      const res = <
        {
          products: {
            items: {
              id: ID;
              createdAt: Date;
              name: string;
              slug: string;
              featuredAsset: Asset;
              vairants: ProductVariant;
            }[];
          };
        }
      >response;

      this.newArrivals = res.products.items.map(
        (n) => ({
          id: n.id,
          createdAt: n.createdAt,
          name: n.name,
          slug: n.slug,
          featuredAsset: n.featuredAsset,
          vairants: n.vairants
        })
      );
      
    })
  }

  ngOnDestroy() {
    
  }
}