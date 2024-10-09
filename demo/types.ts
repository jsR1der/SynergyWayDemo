import { THEMES } from './utils';
import { Company } from '../types';
import { MosaicBranch, MosaicNode } from 'react-mosaic-component';

export type Theme = keyof typeof THEMES;

export interface AppState {
  companies: Company[];
  isLoading: boolean;
  currentNode: MosaicNode<number> | null;
  currentTheme: Theme;
}

export interface ExampleWindowProps {
  companies: Company[];
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
}
