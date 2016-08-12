/// <reference path="../../../types/horizon/index.d.ts" />
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as Horizon from '@horizon/client';
declare var API_URL: string
export class ResponseTimeService {

    horizon
    speed
    user


    constructor() {
        if (typeof (window) === 'object') {
            this.horizon = Horizon({ authType: 'anonymous', host: API_URL });
            this.speed = this.horizon('speed');
            this.horizon.connect()
        }
    }

    getSpeed(user) {
        return this.speed
            .findAll({ 'owner': user.id })
            .order('datetime', 'descending')
            .limit(1)
            .watch()
    }

    addSpeed(user): Observable<[any]> {
        return this.speed.store({
            'owner': user.id,
            datetime: Date.now(),
        })

    }
    deleteSpeed(id) {
        setTimeout(() => {
            this.speed.remove({ id: id })
        }, 500)
    }
    getUser(): Observable<[any]> {
        return this.horizon.currentUser().fetch()
    }

}

