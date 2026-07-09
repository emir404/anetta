import * as migration_20260709_013122_initial from './20260709_013122_initial';

export const migrations = [
  {
    up: migration_20260709_013122_initial.up,
    down: migration_20260709_013122_initial.down,
    name: '20260709_013122_initial'
  },
];
