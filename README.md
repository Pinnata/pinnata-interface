# pinnata-interface

Web application for the Pinnata protocol.

## Developing

Install Yarn, then run:

```bash
yarn install
yarn start
```

### Updating ABIs

First, ensure that [fountain_of_youth](https://github.com/Pinnata/fountain_of_youth) and [homora_v2_contracts](https://github.com/Pinnata/homora_v2_contracts) are cloned in the parent directory.

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

TODO: add arweave deploys. 
## Deploying

Deploys are sent to Vercel.
