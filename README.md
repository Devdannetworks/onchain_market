# Onchain Market

THis is a project aimed to provide a decentralized and open market for people who want to predict on the outcome of worlld events

## Key Features

1. **Events Management**

   - **Create an event:** This is the api that exposes the create an event functionality and save it in stable memory storage
   - **Update an event:** This enables us to update the details of an existing event so long as its not settled
   - **List all events:** An api that lists all events stored
   - **Retrieve a single event:** An api that retrieves the details of a single event given its id
   - **Filter events by category:** View all events satisfying a certain category
   - **Delete an event:** This functionality enables one to delete an event they created so long as its settled

2. **Bets Management**
   - **Place a bet:** This creates a bet associated with a specific event, the outcome chosen and user_id interacting with the event. It also increments the total_bets and total_amount of that particular outcome.

## Requirements

- rustc 1.64 or higher

```bash
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
$ source "$HOME/.cargo/env"
```

- rust wasm32-unknown-unknown target

```bash
$ rustup target add wasm32-unknown-unknown
```

- install `dfx`

```bash
$ DFX_VERSION=0.15.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
$ echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
$ source ~/.bashrc
$ dfx start --background
```

- Add the codeS below to generate the IDL in candid file
- In your `package.json` in the root folder add

```bash
"scripts": {
    "generate": "./did.sh && dfx generate",
    "gen-deploy": "./did.sh && dfx generate && dfx deploy -y"
},
```

- Add a `did.sh` file in the root directory and add the following. Ensure the name matches the name of your project

```bash
#!/usr/bin/env bash


function generate_did() {
  local canister=$1
  canister_root="src/$canister"

  cargo build --manifest-path="$canister_root/Cargo.toml" \
      --target wasm32-unknown-unknown \
      --release --package "$canister" \

  candid-extractor "target/wasm32-unknown-unknown/release/$canister.wasm" > "$canister_root/$canister.did"
}

CANISTERS=onchain_market_backend

for canister in $(echo $CANISTERS | sed "s/,/ /g")
do
    generate_did "$canister"
done
```

- To run the tests go to the terminal and run:

```bash
    cargo test
```

- To start the replica run:

```
dfx start --background

```

- To generate the `.did` file contents and deploy the canisters run:

```bash
npm run gen-deploy

```
