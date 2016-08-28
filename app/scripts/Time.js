import EventEmitter from 'tiny-emitter';
import timeActions from './actions/time';
import { oneYearLifeCicle } from './actions/slaves';

export default class Time extends EventEmitter {
  static YEAR = 10 * 1000; // a year in ms
  timer = null;

  start() {
    this.tick();
  }

  pause() {
    clearTimeout(this.timer);
  }

  tick() {
    this.nextYear();
    this.timer = setTimeout(::this.tick, Time.YEAR);
  }

  nextYear() {
    oneYearLifeCicle();
    timeActions.newYear();
    this.emit('year');
  }

}