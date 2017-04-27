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
      this._admin.login(req.body)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.post('/logout', (req, res) => {
      this._admin.logout()
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.delete('/booking/:id', (req, res) => {
      this._booking.cancelBooking(req.body)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.get('/booking', (req, res) => {
      this._booking.getAllBookings()
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.delete('/room/:id', (req, res) => {
      this._room.deleteRoom(req.params.id)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.put('/room/:id', (req, res) => {
      this._room.modifyRoom(req.body)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.post('/room', (req, res) => {
      this._room.addRoom(req.body)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.get('/room', (req, res) => {
      this._room.getAllRooms()
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });

    this._router.get('/room/:id/image', (req, res) => {
      this._room.getRoomImage(req.params.id)
        .then(data => {
          const response = { faults: [], data };
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          res.send(response);
        });
    });
  }
}