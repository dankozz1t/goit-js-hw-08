import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const player = new Vimeo('vimeo-player');

player.setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY));

player.on(
  'timeupdate',
  _throttle(({ seconds }) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
  }, 1000)
);
