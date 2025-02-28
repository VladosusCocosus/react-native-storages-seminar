import {storage} from "./redux";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";

const clientStorage = {
    setItem: (key: string, value: boolean | string | number | Uint8Array) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value === undefined ? null : value;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
};

export const clientPersister = createSyncStoragePersister({ storage: clientStorage });
