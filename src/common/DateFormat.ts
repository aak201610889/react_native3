// utils/dateUtils.js
import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const formatDate =     (date:any) => moment(date).format(DATE_FORMAT);
export const formatTime =     (date:any) => moment(date).format(TIME_FORMAT);
export const formatDateTime = (date:any) => moment(date).format(DATETIME_FORMAT);
