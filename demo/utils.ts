// tslint:disable-next-line no-var-requires
import { Classes } from '@blueprintjs/core'; // tslint:disable-next-line:no-var-requires
import classNames from 'classnames';
import React from 'react';
import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton';
import { AppState } from './types'; // tslint:disable-next-line:no-var-requires

// tslint:disable-next-line:no-var-requires
export const gitHubLogo = require('./GitHub-Mark-Light-32px.png');
// tslint:disable-next-line no-var-requires
export const { version } = require('../package.json');

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};

// @ts-ignore
export const additionalControls = React.Children.toArray([CloseAdditionalControlsButton]);

export const EMPTY_ARRAY: any[] = [];

export const defaultAppState: AppState = {
  companies: [],
  isLoading: true,
  currentNode: {
    direction: 'row',
    first: 1,
    second: {
      direction: 'column',
      first: 2,
      second: 3,
    },
    splitPercentage: 40,
  },
  currentTheme: 'Blueprint',
};
