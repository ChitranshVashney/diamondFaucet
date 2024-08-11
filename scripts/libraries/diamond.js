const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };

// get function selectors from ABI
function getSelectors(contract) {
  const selectors = contract.interface.fragments
    .filter((fragment) => fragment.type === "function") // Filter to include only function fragments
    .map((fragment) => {
      const inputs = fragment.inputs.map((input) => input.type).join(",");
      const functionSignature = `${fragment.name}(${inputs})`;
      const hash = ethers.keccak256(ethers.toUtf8Bytes(functionSignature));
      return hash.slice(0, 10); // Return the first 4 bytes (8 hex characters) of the Keccak-256 hash
    });
  selectors.contract = contract;
  selectors.remove = remove;
  selectors.get = get;
  return selectors;
}

// get function selector from function signature
function getSelector(func) {
  const abiInterface = new Interface([func]);
  return abiInterface.getFunction(Fragment.from(func)).selector;
}

// used with getSelectors to remove selectors from an array of selectors
// functionNames argument is an array of function signatures
function remove(functionNames) {
  const selectors = this.filter((v) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getFunction(functionName).selector) {
        return false;
      }
    }
    return true;
  });
  selectors.contract = this.contract;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

// used with getSelectors to get selectors from an array of selectors
// functionNames argument is an array of function signatures
function get(functionNames) {
  const selectors = this.filter((v) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getFunction(functionName).selector) {
        return true;
      }
    }
    return false;
  });
  selectors.contract = this.contract;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

// remove selectors using an array of signatures
function removeSelectors(selectors, signatures) {
  const iface = new Interface(signatures.map((v) => "function " + v));
  const removeSelectors = signatures.map((v) => iface.getFunction(v).selector);
  selectors = selectors.filter((v) => !removeSelectors.includes(v));
  return selectors;
}

// find a particular address position in the return value of diamondLoupeFacet.facets()
function findAddressPositionInFacets(facetAddress, facets) {
  for (let i = 0; i < facets.length; i++) {
    if (facets[i].facetAddress === facetAddress) {
      return i;
    }
  }
  return -1;
}

exports.getSelectors = getSelectors;
exports.getSelector = getSelector;
exports.FacetCutAction = FacetCutAction;
exports.remove = remove;
exports.removeSelectors = removeSelectors;
exports.findAddressPositionInFacets = findAddressPositionInFacets;
