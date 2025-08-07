import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../../models/product.model';
import { environment } from '../../environment';
@Injectable({
  providedIn: 'root'
})
export class Products {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(
  ): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}?limit=150`);
  }

  // Fetch a single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl.replace('/products', '')}/products/categories`);
  }

  // Fetch category list (slugs only)
  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl.replace('/products', '')}/products/category-list`);
  }


  //fetch product by categories
  getProductByCategory(category: string): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${environment.baseUrl}/category/${category}`)
  }
}