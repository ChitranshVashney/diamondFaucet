# Diamond Proxy

- DiamondCutFacet deployed: 0xB68fd801dE2107e1DAe7AeF6f1e03fa772d56318
  https://testnet.bscscan.com/address/0xB68fd801dE2107e1DAe7AeF6f1e03fa772d56318#code
- Diamond deployed: 0xa0A708b0484F4080dcD31CEb2E6557e01cB4607f
  https://testnet.bscscan.com/address/0xa0A708b0484F4080dcD31CEb2E6557e01cB4607f#code
- DiamondInit deployed: 0x624abf031fe8B5a8c49C4cC0AC1317710273Af0A
  https://testnet.bscscan.com/address/0x624abf031fe8B5a8c49C4cC0AC1317710273Af0A#code

### Deploying facets

- DiamondLoupeFacet deployed: 0x3b30AD8069191538aF0E28991642F1929e9e1e12
  https://testnet.bscscan.com/address/0x3b30AD8069191538aF0E28991642F1929e9e1e12#code
- OwnershipFacet deployed: 0x402C6AcB8e2117915a9c66594547E04FC436B05d
  https://testnet.bscscan.com/address/0x08cfBE62857F30184Ea91f35479750516F8B4093#code
- ContractA deployed: 0x24136857aB7D5A83A12fdBE43971e298219CDA15
  https://testnet.bscscan.com/address/0x24136857aB7D5A83A12fdBE43971e298219CDA15#code
- ContractB deployed: 0x5729698F1a4B1DDEA9dB9B3b067656fDa82701BA
  https://testnet.bscscan.com/address/0x5729698F1a4B1DDEA9dB9B3b067656fDa82701BA#code

```js
Diamond Cut: [
  {
    facetAddress: '0x3b30AD8069191538aF0E28991642F1929e9e1e12',
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
    facetAddress: '0x402C6AcB8e2117915a9c66594547E04FC436B05d',
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
    facetAddress: '0x24136857aB7D5A83A12fdBE43971e298219CDA15',
    action: 0,
    functionSelectors: [
      '0x20965255',
      '0x55241077',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  },
  {
    facetAddress: '0x5729698F1a4B1DDEA9dB9B3b067656fDa82701BA',
    action: 0,
    functionSelectors: [
      '0x70480275',
      '0x41858c4b',
      '0x8204c326',
      '0x24d7806c',
      '0x1785f53c',
      '0x83b8a5ae',
      '0xada8f919',
      contract: [BaseContract],
      remove: [Function: remove],
      get: [Function: get]
    ]
  }
]
```
