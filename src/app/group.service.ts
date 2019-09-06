import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Group } from './group';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class GroupService {

  private groupsUrl = 'http://localhost:3000/api/groups';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET groups from the server */
  getGroups (): Observable<Group[]> {
    console.log("io");
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError<Group[]>('getGroups', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/?id=${id}`;
    return this.http.get<Group[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Group>(`getGroup id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group, this.httpOptions).pipe(
      tap((newHero: Group) => this.log(`added group w/ id=${newHero.id}`)),
      catchError(this.handleError<Group>('addGroup'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteGroup (group: Group | number): Observable<Group> {
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.groupsUrl}/${id}`;

    return this.http.delete<Group>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Group>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateGroup (group: Group): Observable<any> {
    return this.http.put(this.groupsUrl, group, this.httpOptions).pipe(
      tap(_ => this.log(`updated group id=${group.id}`)),
      catchError(this.handleError<any>('updateGroup'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a GroupService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GroupService: ${message}`);
  }
}
