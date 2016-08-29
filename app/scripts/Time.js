import EventEmitter from 'tiny-emitter';
import timeActions from './actions/time';
import { oneYearLifeCicle } from './actions/slaves';

export default class Time extends EventEmitter {
  timer = null;
  initialVel = 10;
  vel = 10;

  start() {
    this.tick();
  }

  pause() {
    clearTimeout(this.timer);
  }

  stop(){
    this.stopped = true;
    clearTimeout(this.timer);
  }

  reset() {
    clearTimeout(this.timer);
    this.tick();
  }

  setVel(secs) {
    this.vel = secs;
    this.reset();
  }

  resetVel(){
    this.vel = this.initialVel;
    this.reset();
  }

  tick() {
    if (this.stopped) return;
    this.nextYear();
    this.timer = setTimeout(() => this.tick(), this.vel * 1000);
  }

  nextYear() {
    oneYearLifeCicle();
    timeActions.newYear();
    this.emit('year');
  }

}
