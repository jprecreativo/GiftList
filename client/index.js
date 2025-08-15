const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name = process.argv[2];

  if (!name) {
    console.log("Please provide a name! Example: node index.js JP");
    return;
  }

  const index = niceList.findIndex(n => n === name);
  const namesMerkleTree = new MerkleTree(niceList);
  const proof = namesMerkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!

    name: name,
    proof: proof,
    root: namesMerkleTree.getRoot()
  });

  console.log({ gift });
}

main();