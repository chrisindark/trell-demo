import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import input_data from './input_folder_structure.json';

function App() {
  const asyncArr = [];

  const [tree, setTree] = useState(false);

  const handleClick = (e, value) => {
    console.log('clicked', value);
    e.stopPropagation();
    value.showChildren = !value.showChildren;
    setTree(!tree);
  };

  const getChildrenFolders = (root) => {
    if (root.children && root.children.length && root.showChildren) {
      const children = root.children;

      const html = [];

      children.forEach((value, index) => {
        html.push(
          <div className={'p10 grey border-black'}
              key={index}
              onClick={(e) => handleClick(e, value)}>
            {value.name}

            {getChildrenFolders(value)}
          </div>
        )
      });

      return html;
    } else {
      // return not required but for readability
    }
  };

  const renderRoot = (root) => {
    const name = root.name;
    const value = root;
    return (
      <div onClick={(e) => handleClick(e, value)}>
        {name}
        {getChildrenFolders(value)}
      </div>
    )
  }

  const createAsyncFunctions = () => {
    const promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('foo');
      }, 300);
    });

    const promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('bar');
      }, 300);
    });

    const promise3 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('baz');
      }, 300);
    });

    const promise4 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('xyz');
      }, 300);
    });

    asyncArr.push(promise1, promise2, promise3, promise4);

    return (
      <div className={'p30'}></div>
    );
  };

  const handleParallelClick = () => {
    ExecuteParallel();
  }

  const ExecuteParallel = () => {
    Promise.all(asyncArr).then((results) => {
      console.log(results);
    });
  }

  const renderAsyncParallelButton = () => {
    return (
      <div className={'p30'}>
        <button onClick={handleParallelClick}>Parallel</button>
      </div>
    )
  }

  const handleSequentialClick = () => {
    ExecuteSequential();
  };

  const successCallback = (res, i) => {
    ++i;
    console.log(i, res);
    if (i < asyncArr.length) {
      asyncArr[i].then((res) => successCallback(res, i));
    }
  }

  const ExecuteSequential = () => {
    let i = 0;
    asyncArr[i].then((res) => successCallback(res, i));
  }

  const renderAsyncSequentialButton = () => {
    return (
      <div className={''}>
        <button onClick={handleSequentialClick}>Sequential</button>
      </div>
    )
  }

  return (
    <div className="App">
      App

      {renderRoot(input_data)}

      {createAsyncFunctions()}
      {renderAsyncParallelButton()}
      {renderAsyncSequentialButton()}
    </div>
  );
}

export default App;
