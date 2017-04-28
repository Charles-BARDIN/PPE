const express = require('express');
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { AdminAdapter } from '../admin';

export class ExpressApi {
  private _router;
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _admin: AdminAdapter;
  private _logger: ILogger;
  private _config: {
    roomImageRoot: string
  };

  constructor(config: {
    room: RoomAdapter,
    booking: BookingAdapter,
    admin: AdminAdapter,
    config: {
      roomImageRoot: string
    },
    logger: ILogger
  }) {
    this._router = express.Router();
    this._room = config.room;
    this._booking = config.booking;
    this._admin = config.admin;
    this._logger = config.logger;

    this._router.use(bodyParser.json({ limit: '50mb' }));
    this._config = config.config;
    this._setApi();
  }

  get expressRouter() {
    return this._router;
  }

  private _setApi() {
    this._router.post('/login', (req, res) => {
      this._logger.log('ExpressApi: request POST on /login', req.body);
      this._admin.login(req.body)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request POST on /login, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request POST on /login, response:', response);
          res.send(response);
        });
    });

    this._router.post('/logout', (req, res) => {
      this._logger.log('ExpressApi: request POST on /logout');
      this._admin.logout()
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request POST on /logout, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request POST on /logout, response:', response);
          res.send(response);
        });
    });

    this._router.delete('/booking/:id', (req, res) => {
      this._logger.log('ExpressApi: request DELETE on /booking/' + req.params.id, req.body);
      this._booking.cancelBooking(req.body)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request DELETE on /booking/' + req.params.id + ', response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request DELETE on /booking/' + req.params.id + ', response:', response);
          res.send(response);
        });
    });

    this._router.get('/booking', (req, res) => {
      this._logger.log('ExpressApi: request GET on /booking');
      this._booking.getAllBookings()
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request GET on /booking, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request GET on /booking, response:', response);
          res.send(response);
        });
    });

    this._router.delete('/room/:id', (req, res) => {
      this._logger.log('ExpressApi: request DELETE on /room/' + req.params.id);
      this._room.deleteRoom(req.params.id)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request DELETE on /room/' + req.params.id + ', response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request DELETE on /room/' + req.params.id + ', response:', response);
          res.send(response);
        });
    });

    this._router.put('/room/:id', (req, res) => {
      this._logger.log('ExpressApi: request PUT on /room/' + req.params.id, req.body);
      this._room.modifyRoom(req.body)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request PUT on /room/' + req.params.id + ', response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request PUT on /room/' + req.params.id + ', response:', response);
          res.send(response);
        });
    });

    this._router.post('/room', (req, res) => {
      this._logger.log('ExpressApi: request POST on /room', req.body);
      this._room.addRoom(req.body)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request POST on /room, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request POST on /room, response:', response);
          res.send(response);
        });
    });

    this._router.get('/room', (req, res) => {
      this._logger.log('ExpressApi: request GET on /room');
      this._room.getAllRooms()
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request GET on /room, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request GET on /room, response:', response);
          res.send(response);
        });
    });

    this._router.get('/room/:id/image', (req, res) => {
      this._logger.log('ExpressApi: request GET on /room/' + req.params.id + '/image');
      this._room.getRoomImage(req.params.id)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log('ExpressApi: request GET on /room/' + req.params.id + '/image, response:', response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log('ExpressApi: request GET on /room/' + req.params.id + '/image, response:', response);
          res.send(response);
        });
    });
  }
}