import {PriorityDao} from '../interface/PriorityDao';
import {Priority} from '../../../../model/Priority';
import {Observable} from 'rxjs';

export class PriorityDaoArray implements PriorityDao{
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(T): Observable<Priority> {
    return undefined;
  }

}
