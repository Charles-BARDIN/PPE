/**
 * Server api :
 *   VERB______URL________ACTION_____
 *   POST | /login    | login
 *   POST | /logout   | logout
 *   POST | /user     | register user
 *   GET  | /room     | get room list
 *   POST | /booking  | book a room
 *   PUT  | /user/:id | Modify profile
 * 
 * Response :
 *   {
 *    data: any,
 *    faults: string[]
 *   }
 */

const express = require('express');
import * as bodyParser from 'body-parser';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

export class Router {
  private _router;
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;

  constructor(config: {
    room: RoomAdapter,
    booking: BookingAdapter,
    user: UserAdapter
  }) {
    this._router = express.Router();
    this._room = config.room;
    this._booking = config.booking;
    this._user = config.user;

    this._router.use(bodyParser.json());
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
        mail?: string,
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