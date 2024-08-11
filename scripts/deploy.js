const hre = require("hardhat"); // Import Hardhat Runtime Environment
const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

async function deployDiamond() {
  const [accounts] = await ethers.getSigners();
  const contractOwner = accounts;

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.waitForDeployment();
  console.log("DiamondCutFacet deployed:", diamondCutFacet.target);
  await new Promise((resolve) => setTimeout(resolve, 20000));

  // Verify DiamondCutFacet
  await new Promise((resolve) => setTimeout(resolve, 20000));
  await hre.run("verify:verify", {
    address: diamondCutFacet.target,
    constructorArguments: [],
  });

  // deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(
    contractOwner.address,
    diamondCutFacet.target
  );
  await diamond.waitForDeployment();
  console.log("Diamond deployed:", diamond.target);

  // Verify Diamond
  await new Promise((resolve) => setTimeout(resolve, 20000));
  await hre.run("verify:verify", {
    address: diamond.target,
    constructorArguments: [contractOwner.address, diamondCutFacet.target],
  });

  // deploy DiamondInit
  const DiamondInit = await ethers.getContractFactory("DiamondInit");
  const diamondInit = await DiamondInit.deploy();
  await diamondInit.waitForDeployment();
  console.log("DiamondInit deployed:", diamondInit.target);

  // Verify DiamondInit
  await new Promise((resolve) => setTimeout(resolve, 20000));
  await hre.run("verify:verify", {
    address: diamondInit.target,
    constructorArguments: [],
  });

  // deploy facets
  console.log("");
  console.log("Deploying facets");
  const FacetNames = [
    "DiamondLoupeFacet",
    "OwnershipFacet",
    "ContractA",
    "ContractB",
  ];
  const cut = [];
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.waitForDeployment();
    console.log(`${FacetName} deployed: ${facet.target}`);

    // Verify each facet
    await new Promise((resolve) => setTimeout(resolve, 20000));
    await hre.run("verify:verify", {
      address: facet.target,
      constructorArguments: [],
    });

    cut.push({
      facetAddress: facet.target,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }

  // upgrade diamond with facets
  console.log("");
  console.log("Diamond Cut:", cut);
  const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.target);
  let tx;
  let receipt;
  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(cut, diamondInit.target, functionCall);
  console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond cut");
  return diamond.target;
}

// Run the deployment script
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.deployDiamond = deployDiamond;
