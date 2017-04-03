import { BookingClientLib } from 'booking-client-lib';

import MockedGateway from './mocked-gateway.adapter';
import Router from './router.adapter';

const gateway = new MockedGateway();
const router = new Router();

const hash = value => {
  return `H@$H3D_${value}_V@LU3`;
};

const bookingClientLib = new BookingClientLib();

bookingClientLib.setHash(hash);
bookingClientLib.setGateway(gateway);
bookingClientLib.setRouter(router);

export default bookingClientLib;