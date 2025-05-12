import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiList } from './api-list';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { ApiModel } from './api-model';
import { map as lodashMap, filter as lodashFilter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiList = inject(ApiList)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /**
     *
     * @param key endpointKey key values registered on api-list.ts file
     * @param request type expected by the api called
     * @returns the full GET url with all params added with there is any
     */
  async getHttpCall<T>(key: string, errorDetails?: any, urlParams?: ApiModel): Promise<T> {
    const url = this.setEndpointUrl(key, urlParams);
    const response$ = this.http.get<T>(url, this.httpOptions).pipe(
      catchError((error: any) => {
        throw new Error(error);
      }),
      map((res: any) => {
        return this.handlesResponses(res, key, errorDetails)
      })
    );

    const response = await firstValueFrom(response$);
    return response
  }

  /**
   *
   * @param key endpointKey key values registered on api-list.ts file
   * @param request type expected by the api called
   * @returns the full POST url with all params added with there is any
   */
  postHttpCall<T>(key: string, request: any, errorDetails?: any): Observable<T> {
    const url = this.setEndpointUrl(key);
    return this.http.post<T>(url, request, this.httpOptions).pipe(
      catchError((error: any) => {

        throw new Error(error);
      }),
      map((res: any) => {
        return this.handlesResponses(res, key, errorDetails)
      })
    );
  }

  /**
   *
   * @param key endpointKey key values registered on api-list.ts file
   * @param request type expected by the api called
   * @returns the full PUT url with all params added with there is any
   */
  putHttpCall<T>(key: string, request: any, errorDetails?: any): Observable<T> {
    const url = this.setEndpointUrl(key);
    return this.http.put<T>(url, request, this.httpOptions).pipe(
      catchError((error: any) => {
        throw new Error(error);
      }),
      map((res: any) => {
        return this.handlesResponses(res, key, errorDetails)
      })
    );
  }

  /**
   *
   * @param key endpointKey key values registered on api-list.ts file
   * @param request type expected by the api called
   * @returns the full DELETE url with all params added with there is any
   */
  deleteHttpCall<T>(key: string, errorDetails?: any, urlParams?: ApiModel): Observable<T> {
    const url = this.setEndpointUrl(key, urlParams);
    return this.http.delete<T>(url, this.httpOptions).pipe(
      catchError((error: any) => {
        throw new Error(error);
      }),
      map((res: any) => {
        return this.handlesResponses(res, key, errorDetails)
      })
    );
  }
  /**
   * Handles the response from an API call by checking for errors and logging as necessary.
   * 
   * If the response is null, logs the error and throws an exception indicating the response is null.
   * If the response contains an error code (other than '0'), handles it based on the errorDetails:
   * - If errorDetails.hideModal is true, throws an error with the description from the response.
   * - Otherwise, logs the error details and throws an error with the error code.
   * 
   * @param {Object} res - The response object from the API call. Expected to contain a status property with code and optionally description.
   * @param {string} key - A key used for logging or identifying the error context.
   * @param {Object} errorDetails - Details for handling the error. Should include:
   *   @param {boolean} errorDetails.hideModal - Indicates whether to hide the modal for error display.
   * @throws {Error} Throws an error if the response is null or if the response contains an error code.
   * @returns {Object} The response object if no errors are found.
   */
  handlesResponses(res: any, key: any, errorDetails: any) {
    // Check if response is null or undefined
    if (!res) {
      this.setLogAndDisplayError(key, errorDetails);
      throw new Error('Response is null');
    }

    // Return the response if no errors
    return res;
  }

  /**
   *
   * @param endpointKey key values registered on api-list.ts file
   * @param urlParams? object like { key: value, key: value} for your get call
   * @returns the url by adding the params if there is params to be added
   */
  setEndpointUrl(endpointKey: string, urlParams?: ApiModel): string {
    const baseUrlString = this.apiList.getEndpoint(endpointKey);
    const urlParamsString = urlParams ? this.objectToQueryParams(urlParams) : '';

    return baseUrlString + urlParamsString;
  }

  objectToQueryParams(obj: { [key: string]: string }): string {
    const queryParams = lodashMap(obj, (value, key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });
    // Remove null values (keys that were skipped)
    const filteredQueryParams = lodashFilter(queryParams);

    return '?' + filteredQueryParams.join('&');
  }

  setLogAndDisplayError(key: any, errorDetails: any, res?: any): void {
    if (!res) {
      //this.logger.logError('API returned null', key);
      //this.utilMethods.displayErrorMsg(errorDetails?.title || 'Error!', errorDetails?.description, errorDetails?.route);
    } else {
      //this.logger.logError(API unsuccessfull code: ${res.status?.code}, key);
      //this.utilMethods.displayErrorMsg(errorDetails?.title || 'Error!', res?.status?.description || errorDetails?.description, errorDetails?.route);
    }
  }
}
