import * as migration_20260702_173241_initial from './20260702_173241_initial';
import * as migration_20260702_175742_catalogue_fields from './20260702_175742_catalogue_fields';

export const migrations = [
  {
    up: migration_20260702_173241_initial.up,
    down: migration_20260702_173241_initial.down,
    name: '20260702_173241_initial',
  },
  {
    up: migration_20260702_175742_catalogue_fields.up,
    down: migration_20260702_175742_catalogue_fields.down,
    name: '20260702_175742_catalogue_fields'
  },
];
