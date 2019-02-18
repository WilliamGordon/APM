import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './products.service';

@Component({
    selector : 'pm-products',
    templateUrl : './products-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product list';
    imageWidth: Number = 50;
    imageMargin: Number = 2;
    showImage: Boolean = false;

    private _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
        console.log(this.listFilter);
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

      constructor(private productService: ProductService) {
      }

      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
      }

      performFilter(filterBy: string): IProduct[] {
          filterBy = filterBy.toLocaleLowerCase();
          return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      toggleImage(): void {
        this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }
}
