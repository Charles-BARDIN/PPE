import { BookingClientLib } from 'booking-client-lib';

import Gateway from './gateway.adapter';
import MockedGateway from './mocked-gateway.adapter';
import Router from './router.adapter';

import config from '../config';

const gateway = config.isMock ? new MockedGateway() : new Gateway(config.apiBaseUrl);
const router = new Router();

const hash = value => {
  return `H@$H3D_${value}_V@LU3`;
};

const bookingClientLib = new BookingClientLib();

bookingClientLib.setHash(hash);
bookingClientLib.setGateway(gateway);
bookingClientLib.setRouter(router);

export default bookingClientLib;