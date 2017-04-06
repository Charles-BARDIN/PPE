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

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

export class ExpressApi {
  private _router;
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;
  private _config;

  constructor(config: {
    room: RoomAdapter,
    booking: BookingAdapter,
    user: UserAdapter,
    config: any
  }) {
    this._router = express.Router();
    this._room = config.room;
    this._booking = config.booking;
    this._user = config.user;

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
      this._user.login(credentials)
        .then(data => {
          res.send({ faults: [], data });
        })
        .catch(errors => {
          res.send({ faults: errors });
        });
    });

    this._router.post('/logout', (req, res) => {
      res.send({ faults: [], data: true });
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

      this._user.add(user)
        .then(data => {
          res.send({ faults: [], data })
        })
        .catch(errors => {
          res.send({ faults: errors });
        });
    });

    this._router.get('/room', (req, res) => {
      this._room.get()
        .then(data => {
          res.send({ faults: [], data })
        })
        .catch(errors => {
          res.send({ faults: errors });
        });
    });

    this._router.get('/room/:id/image', (req, res) => {
        this._room.getImageName(req.params.id)
          .then(imageName => {
            res.sendFile(path.resolve(this._config.roomImageRoot, imageName));
          })
          .catch(errors => {
            res.send({ faults: errors });
          });
    });

    this._router.post('/booking', (req, res) => {
      const booking: { roomID: number, userID: number, date: Date } = req.body;

      this._booking.bookARoom(booking)
        .then(data => {
          res.send({ faults: [], data })
        })
        .catch(errors => {
          res.send({ faults: errors });
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

      this._user.update(modifiedUser)
        .then(data => {
          res.send({ faults: [], data })
        })
        .catch(errors => {
          res.send({ faults: errors });
        });
    });
  }
}