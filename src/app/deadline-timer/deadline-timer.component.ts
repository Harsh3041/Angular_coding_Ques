import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeadlineService } from '../deadline.service';
import { interval, Subject, takeUntil, switchMap, map, BehaviorSubject, timer, takeWhile } from 'rxjs';

@Component({
  selector: 'app-deadline-timer',
  templateUrl: './deadline-timer.component.html',
  styleUrls: ['./deadline-timer.component.css']
})
export class DeadlineTimerComponent{
  public secondsLeft$ = new BehaviorSubject<number | null>(null);
  private destroy$ = new Subject<void>();

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.deadlineService.getDeadline().pipe(
      switchMap(response =>
        timer(0,1000).pipe(
          map(i => response.secondsLeft-i),
          takeWhile(seconds => seconds >=0)
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe(this.secondsLeft$)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
