# dahlia-interface

Frontend for the Dahlia protocol.

## Developing

Install Yarn, then run:

```bash
yarn install
yarn start
```

### Updating ABIs

First, ensure that [fountain_of_youth](https://github.com/Dahlia-Finance/fountain_of_youth) and [homora_v2_contracts](https://github.com/Dahlia-Finance/homora_v2_contracts) are cloned in the parent directory.

In _fountain_of_youth_, run:

```bash
yarn build
```

In _homora_v2_contracts_, run:

```bash
git fetch origin
git checkout dev
git reset --hard origin/dev
brownie compile
```

Then in this repo, run:

```bash
./scripts/refresh_abis.sh
```

## Deploying

Deploys are sent to Vercel.
