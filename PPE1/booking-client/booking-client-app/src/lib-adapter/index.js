import { BookingClientLib } from 'booking-client-lib';

import router from './router.adapter';
import Gateway from './gateway.adapter';

const gateway = new Gateway();

const hash = value => {
  return `H@$H3D_${value}_V@LU3`;
};

const bookingClientLib = new BookingClientLib({
  hash,
  router
});

bookingClientLib.setGateway(gateway);

export default bookingClientLib;