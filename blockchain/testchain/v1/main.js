import Block from "./Block.js";

const genesisBlock = Object.create(Block);
genesisBlock.init(0, Date.now(), "Genesis block", "");
console.info(genesisBlock.getHash());
