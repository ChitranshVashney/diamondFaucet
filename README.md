# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

- DiamondCutFacet deployed: 0x133A54d6fa1f171E37b1fAB5Dd7e7b785E33C5B1
  https://testnet.bscscan.com/address/0x133A54d6fa1f171E37b1fAB5Dd7e7b785E33C5B1#code
- Diamond deployed: 0x08215B93594B058A4Dc94014B26C0F0F54B6941D
  https://testnet.bscscan.com/address/0x08215B93594B058A4Dc94014B26C0F0F54B6941D#code
- DiamondInit deployed: 0x3C5E409Dbe3fa59435cdCb790cbe14e54c6A9E05
  https://testnet.bscscan.com/address/0x3C5E409Dbe3fa59435cdCb790cbe14e54c6A9E05#code

### Deploying facets

- DiamondLoupeFacet deployed: 0x377D5A93c99Aa09F804E1f430950F808194abbDd
  https://testnet.bscscan.com/address/0x377D5A93c99Aa09F804E1f430950F808194abbDd#code
- OwnershipFacet deployed: 0x8Bc1149D0B08e1aEe2358e0323FC7243cC6cF3f2
  https://testnet.bscscan.com/address/0x8Bc1149D0B08e1aEe2358e0323FC7243cC6cF3f2#code
- ContractA deployed: 0x5b3E2145991db274dbc94ffda4527B5F23c61350
  https://testnet.bscscan.com/address/0x5b3E2145991db274dbc94ffda4527B5F23c61350#code
- ContractB deployed: 0x19200759bdD654502d43B12CE8e73718bB7dF9D4
  https://testnet.bscscan.com/address/0x19200759bdD654502d43B12CE8e73718bB7dF9D4#code

```js
Diamond Cut: [
  {
    facetAddress: '0x377D5A93c99Aa09F804E1f430950F808194abbDd',
    action: 0,
    functionSelectors: [
      '0xcdffacc6',
      '0x52ef6b2c',
      '0xadfca15e',
      '0x7a0ed627',
      '0x01ffc9a7',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  },
  {
    facetAddress: '0x8Bc1149D0B08e1aEe2358e0323FC7243cC6cF3f2',
    action: 0,
    functionSelectors: [
      '0x8da5cb5b',
      '0xf2fde38b',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  },
  {
    facetAddress: '0x5b3E2145991db274dbc94ffda4527B5F23c61350',
    action: 0,
    functionSelectors: [
      '0x20965255',
      '0x8da5cb5b',
      '0x715018a6',
      '0x55241077',
      '0xf2fde38b',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  },
  {
    facetAddress: '0x19200759bdD654502d43B12CE8e73718bB7dF9D4',
    action: 0,
    functionSelectors: [
      '0x75b238fc',
      '0xa217fddf',
      '0x70480275',
      '0x248a9ca3',
      '0x2f2ff15d',
      '0x91d14854',
      '0x1785f53c',
      '0x83b8a5ae',
      '0x36568abe',
      '0xd547741f',
      '0x29575f6a',
      '0x01ffc9a7',
      '0xada8f919',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  }
]
```
