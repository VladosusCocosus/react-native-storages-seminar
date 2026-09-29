# Storage in React Native — seminar material

Code for a talk on how persistence actually works in a React Native app (February 2025).

The talk goes in two parts: first build a key-value store by hand and watch it get slow,
then look at what the React Native ecosystem hands you instead and what each option is
really doing underneath.

---

## Part 1 — build a key-value store

Two implementations of the same tiny API, `setValue(key, value)` and `getValue(key)`, both
backed by one append-only text file (`storage.text`).

### [`simple-key-value-storage/`](simple-key-value-storage) — the obvious version

Writes append a `key - value` line. Reads load the whole file, split it, and scan for a
matching key.

It works, and it is correct. It is also O(n) per read, re-parses the entire file on every
lookup, and holds the whole thing in memory while it does. The commented-out block at the
bottom writes 30,000 keys so you can watch `performance.now()` react.

### [`simple-key-value-storage-2/`](simple-key-value-storage-2) — the version with an index

Same file format, same append-only writes. The difference is that the file is parsed once
into an in-memory map at construction, and reads answer from the map.

Reads become O(1) and the disk is touched only on write. The trade is the one every real
store makes: startup now costs a full file read, and memory now holds the whole dataset.

The point of the pair is not that version two is better. It is that "a key-value store" is
a set of trade-offs about **when** you pay — and every library in part two has picked a
position on that same axis.

---

## Part 2 — [`RNStorageTest/`](RNStorageTest)

A React Native 0.70.6 app wiring up the options you would actually reach for, each behind
its own toggle in [`App.tsx`](RNStorageTest/App.tsx).

| Approach | What it is | Where it lives |
|---|---|---|
| **AsyncStorage** | The default async key-value API: SQLite on Android, files on iOS. Demoed on its own. | [`app/storage/async-storage.ts`](RNStorageTest/app/storage/async-storage.ts) |
| **MMKV** | Memory-mapped native store. Reads are synchronous and skip the bridge entirely. | [`app/storage/redux.ts`](RNStorageTest/app/storage/redux.ts) |
| **redux-persist** | Persists a Redux store through a storage engine, rehydrating behind a `PersistGate`. | [`app/redux`](RNStorageTest/app/redux) |
| **TanStack Query persistence** | Persists the query cache, so server state survives a restart without becoming client state. | [`app/storage/react-query.ts`](RNStorageTest/app/storage/react-query.ts) |

The wiring is the part worth looking at. MMKV is not a fourth option sitting beside the
others — it is the engine underneath them. `redux.ts` creates one `MMKV()` instance and
adapts it to the `Storage` interface redux-persist expects; `react-query.ts` imports that
same instance and adapts it again to the persister interface TanStack Query expects. Two
libraries with incompatible interfaces, one store, about fifteen lines of adapter each.

That is the practical lesson: the storage engine and the thing doing the persisting are
separate choices, and most of the ecosystem is built to let you swap either one.

Two further points the code makes:

- **redux-persist and query persistence are not interchangeable.** Both survive a restart,
  but one is persisting *your* state and the other is persisting a *cache*. Choose wrongly
  and you ship stale server data as though the user had typed it.
- **MMKV reads synchronously, which changes what you can write.** The theme lives in
  [`app/theme`](RNStorageTest/app/theme) as `useMMKVString('color-scheme')` — a persisted
  value read during render and reactive on change. With AsyncStorage the same feature needs
  an effect, a loading state, and a flash of the wrong theme on launch.

---

## Running it

```bash
cd RNStorageTest
npm install
cd ios && pod install && cd ..

npm run ios      # or: npm run android
```

The plain-Node stores in part one need no setup:

```bash
node simple-key-value-storage/index.js
node simple-key-value-storage-2/index.js
```

Requires the React Native 0.70 toolchain — Node 16+, Ruby with CocoaPods for iOS, JDK 11
for Android.
