import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
    setLocalStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    retrieveLocalStorage<type>(key: string): type {
        return JSON.parse(localStorage.getItem(key)) as type;
    }
}