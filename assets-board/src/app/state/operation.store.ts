import { ResourceStatus } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, Observable, of, Subject, switchMap } from "rxjs";

export type OperationResult<T> = {
  value: T | null;
  error: unknown;
  status: ResourceStatus;
};

const NULL_OPERATION_RESULT = {
  value: null,
  error: null,
  status: ResourceStatus.Idle,
};

export class OperationStore<T> {
  private trigger$ = new Subject<T>();

  public result = toSignal(
    this.trigger$.pipe(
      switchMap((parameter) => this.operation$(parameter)),
      map((value) => this.returnResolved(value)),
      catchError((error) => of(this.returnError(error)))
    ),
    {
      initialValue: NULL_OPERATION_RESULT,
    }
  );

  constructor(private operation$: (parameter: T) => Observable<T>) {}

  public trigger(parameter: T): void {
    this.trigger$.next(parameter);
  }

  private returnResolved(value: T): OperationResult<T> {
    return { value, error: null, status: ResourceStatus.Resolved };
  }
  private returnError(error: unknown): OperationResult<T> {
    return { value: null, error, status: ResourceStatus.Error };
  }
}
