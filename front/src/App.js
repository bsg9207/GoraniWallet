// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import GoraniWallet from "./goraniWallet";

// css
import './App.css';

// buffer definition
import { Buffer } from 'buffer';

window.Buffer = window.Buffer | Buffer;

function App() {
  return (
    <div className="App">
      <GoraniWallet />
    </div>
  );
}

export default App;
