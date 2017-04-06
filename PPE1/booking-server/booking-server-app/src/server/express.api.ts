/**
 * Server api :
 *   VERB____________URL__________ACTION_____
 *   POST | /login              | login
 *   POST | /logout             | logout
 *   POST | /user               | register user
 *   PUT  | /user/:id           | Modify profile
 *   GET  | /room               | get room list
 *   GET  | /room/:roomId/image | Get room image
 *   POST | /booking            | book a room
 * 
 * Response :
 *   {
 *    data: any,
 *    faults: string[]
 *   }
 */

const express = require('express');
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

export class ExpressApi {
  private _router;
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;
  private _logger: ILogger;
  private _config: {
    roomImageRoot: string
  };

  constructor(config: {
    room: RoomAdapter,
    booking: BookingAdapter,
    user: UserAdapter,
    config: {
      roomImageRoot: string
    },
    logger: ILogger
  }) {
    this._router = express.Router();
    this._room = config.room;
    this._booking = config.booking;
    this._user = config.user;
    this._logger = config.logger;

    this._router.use(bodyParser.json());
    this._config = config.config;
    this._setApi();
  }

  get expressRouter() {
    return this._router;
  }

  private _setApi() {
    this._router.post('/login', (req, res) => {
      const credentials: { mail: string, password: string } = req.body;
      this._logger.log(`ExpressApi POST request on /login parameters`, credentials);
      this._user.login(credentials)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log(`ExpressApi POST request on /login response`, response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi POST request on /login response`, response);
          res.send(response);
        });
    });

    this._router.post('/logout', (req, res) => {
      this._logger.log(`ExpressApi POST request on /logout`);
      const response = { faults: [], date: true };
      this._logger.log(`ExpressApi POST request on /logout response`, response);
      res.send(response);
    });

    this._router.post('/user', (req, res) => {
      const user: {
        lastname: string,
        firstname: string,
        address: string,
        town: string,
        zip: string,
        country: string,
        mail: string,
        password: string,
        phone?: string
      } = req.body;

      this._logger.log(`ExpressApi POST request on /user parameters`, user);

      this._user.add(user)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log(`ExpressApi POST request on /user response`, response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi POST request on /user response`, response);
          res.send(response);
        });
    });

    this._router.get('/room', (req, res) => {
      this._logger.log(`ExpressApi GET request on /room`);
      this._room.get()
        .then(data => {
          const response = { faults: [], data };
          this._logger.log(`ExpressApi GET request on /room response`, response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi GET request on /room response`, response);
          res.send(response);
        });
    });

    this._router.get('/room/:id/image', (req, res) => {
      const id = req.params.id;
      this._logger.log(`ExpressApi GET request on /room/${id}/image`);
      this._room.getImageName(id)
        .then(data => {
          this._logger.log(`ExpressApi GET request on /room/${id}/image response file`, data);
          res.sendFile(path.resolve(this._config.roomImageRoot, data));
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi GET request on /room/${id}/image response`, response);
          res.send(response);
        });
    });

    this._router.post('/booking', (req, res) => {
      const booking: { roomID: number, userID: number, date: Date } = req.body;

      this._logger.log(`ExpressApi POST request on /booking parameter`, booking);

      this._booking.bookARoom(booking)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log(`ExpressApi POST request on /booking response`, response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi POST request on /booking response`, response);
          res.send(response);
        });
    });

    this._router.put('/user/:id', (req, res) => {
      let modifiedUser: {
        id: number,
        address?: string,
        town?: string,
        zip?: string,
        country?: string,
        mail: string,
        password?: string,
        oldPassword?: string,
        phone?: string
      } = req.body;
      modifiedUser.id = req.params.id;

      this._logger.log(`ExpressApi PUT request on /user/${modifiedUser.id}`);

      this._user.update(modifiedUser)
        .then(data => {
          const response = { faults: [], data };
          this._logger.log(`ExpressApi PUT request on /user/${modifiedUser.id} response`, response);
          res.send(response);
        })
        .catch(faults => {
          const response = { faults };
          this._logger.log(`ExpressApi PUT request on /user/${modifiedUser.id} response`, response);
          res.send(response);
        });
    });

    this._logger.debug('ExpressApi REST API set');
  }
}