const hasher = Bun.CryptoHasher("sha256");

const Block = {
  init(index, timestamp, data, parentHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.parentHash = parentHash;
    hasher.update(index + timestamp + data + parentHash);
    this.hash = hasher.digest("hex");
  },
  getHash() {
    return this.hash;
  },
};

export default Block;
