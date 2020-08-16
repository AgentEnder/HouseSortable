import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';

import { from, Observable, of, Subject } from 'rxjs';

import { ShareDialogComponent } from '../components/share-dialog/share-dialog.component';
import { ShareInfo } from '../models/share-info-model';

@Injectable()
export class ShareService {
    shareSubject: Subject<null> = new Subject<null>();
    public share$: Observable<null> = from(this.shareSubject);

    constructor(private meta: Meta, private dialog: MatDialog) { }

    #defaultCallback = () => {
        const info: ShareInfo = {
            title: document.title,
            text: (this.meta.getTag('name="description') && this.meta.getTag('name="description').content) || '',
            url: window.location.href
        };

        if ('share' in navigator) {
            navigator.share(info);
        } else {
            this.dialog.open(ShareDialogComponent, { data: info, maxWidth: '400px' });
        }
    }

    // tslint:disable-next-line: member-ordering
    #callback: () => void = this.#defaultCallback;
    // tslint:disable-next-line: member-ordering
    #callbackStack: (() => void)[] = [this.#defaultCallback];

    public shareClicked(): void {
        this.shareSubject.next();
        this.#callback();
    }

    public registerShareCallback(callback: () => void): void {
        this.#callbackStack.push(callback);
        this.#callback = callback;
    }

    public unregisterCallback(): void {
        this.#callbackStack.pop();
        this.#callback = this.#callbackStack[this.#callbackStack.length - 1];
    }

    public createAndRegisterShareCallback = (title?: string, text?: string, url?: string) => {
        const info: ShareInfo = {
            title: title || document.title,
            text: text || (this.meta.getTag('name="description') && this.meta.getTag('name="description').content),
            url: url || window.location.href
        };
        const callback = () => {
            if ('share' in navigator) {
                navigator.share(info);
            } else {
                this.dialog.open(ShareDialogComponent, { data: info });
            }
        };
        this.registerShareCallback(callback);
    }
}
