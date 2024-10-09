import { Classes, HTMLSelect } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import dropRight from 'lodash/dropRight';
import React from 'react';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicZeroState,
  updateTree,
} from 'react-mosaic-component';
import { getData } from './fetch.service';
import '../styles/index.less';
import { Company } from '../types';
import './carbon.less';
import './example.less';
import { AppState, Theme } from './types'; // tslint:disable no-console
import { defaultAppState, gitHubLogo, THEMES, version } from './utils';
import { SampleWindow } from './SampleWindow';
import { LoadingComponent } from './LoadingComponent';

// tslint:disable no-console

export class App extends React.PureComponent<{}, AppState> {
  public state: AppState = defaultAppState;

  componentDidMount() {
    getData(this.setJsonData.bind(this)).then();
  }

  private setJsonData(companies: Company[]): void {
    this.setState({ ...this.state, companies, isLoading: false });
  }

  render() {
    const totalWindowCount = getLeaves(this.state.currentNode).length;
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }
    return (
      <React.StrictMode>
        <div className="react-mosaic-example-app">
          {this.renderNavBar()}
          <Mosaic<number>
            renderTile={(count, path) => (
              <SampleWindow
                companies={this.state.companies}
                count={count}
                path={path}
                totalWindowCount={totalWindowCount}
              />
            )}
            zeroStateView={<MosaicZeroState createNode={() => totalWindowCount + 1} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={THEMES[this.state.currentTheme]}
            blueprintNamespace="bp4"
          />
        </div>
      </React.StrictMode>
    );
  }

  private onChange = (currentNode: MosaicNode<number> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log('Mosaic.onRelease():', currentNode);
  };

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  private addToTopRight = () => {
    let { currentNode } = this.state;
    const totalWindowCount = getLeaves(currentNode).length;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === 'row') {
        first = destination;
        second = totalWindowCount + 1;
      } else {
        first = totalWindowCount + 1;
        second = destination;
      }

      currentNode = updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      currentNode = totalWindowCount + 1;
    }

    this.setState({ currentNode });
  };

  private renderNavBar() {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={Classes.NAVBAR_GROUP}>
          <div className={Classes.NAVBAR_HEADING}>
            <a href="https://github.com/nomcopter/react-mosaic">
              react-mosaic <span className="version">v{version}</span>
            </a>
          </div>
        </div>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Theme:
            <HTMLSelect
              value={this.state.currentTheme}
              onChange={(e) => this.setState({ currentTheme: e.currentTarget.value as Theme })}
            >
              {React.Children.toArray(Object.keys(THEMES).map((label) => <option>{label}</option>))}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />
          <span className="actions-label">Example Actions:</span>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.GRID_VIEW))}
            onClick={this.autoArrange}
          >
            Auto Arrange
          </button>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
            onClick={this.addToTopRight}
          >
            Add Window to Top Right
          </button>
          <a className="github-link" href="https://github.com/nomcopter/react-mosaic">
            <img src={gitHubLogo} />
          </a>
        </div>
      </div>
    );
  }
}
