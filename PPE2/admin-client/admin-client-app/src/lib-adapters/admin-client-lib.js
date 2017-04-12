import { AdminClientLib } from 'admin-client-lib';

import Crypto from 'crypto-js';
import Gateway from './gateway.adapter';
import MockedGateway from './mocked-gateway.adapter';
import Router from './router.adapter';

import config from '../config';

const gateway = config.isMock ? new MockedGateway() : new Gateway(config.apiBaseUrl);
const router = new Router();

const hash = value => {
    return Crypto.SHA256(value).toString();
};

const adminClientLib = new AdminClientLib();

adminClientLib.hash = hash;
adminClientLib.gateway = gateway;
adminClientLib.router = router;

export default adminClientLib;