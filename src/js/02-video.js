import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
const localCurrentTime = localStorage.getItem(LOCAL_STORAGE_KEY);

const player = new Vimeo('vimeo-player');

player.setCurrentTime(localCurrentTime);

const saveTime = _throttle(({ seconds }) => {
  console.log(seconds);
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}, 5000);

player.on('timeupdate', saveTime);
