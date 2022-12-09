// An abstract base model for defining any type of ordered sequence
class Collection {

  constructor({ SubCollectionItem, items }) {
    // A reference to the constructor for the sub-collection's item type
    this.SubCollectionItem = SubCollectionItem;
    this.items = items.map((item) => {
      return new SubCollectionItem(item);
    });
  }

  get(itemIndex) {
    return this.items[itemIndex];
  }

  insert(itemIndex, item) {
    // This method will automatically convert the given property map into the
    // correct item type for the sub-collection instance
    this.items.splice(itemIndex, 0, new this.SubCollectionItem(item));
    this.lastInsertionIndex = itemIndex;
  }

  remove(itemIndex) {
    this.items.splice(itemIndex, 1);
  }

  forEach(callback) {
    return this.items.forEach(callback);
  }

  filter(callback) {
    return this.items.filter(callback);
  }

  map(callback) {
    return this.items.map(callback);
  }

  serialize() {
    return {
      items: this.items.map((item) => item.serialize())
    };
  }

}

// Define an array-like 'length' property on Collection instances
Object.defineProperty(Collection.prototype, 'length', {
  enumerable: false,
  configurable: false,
  get: function () {
    return this.items.length;
  },
  set: function (newLength) {
    this.items.length = newLength;
    return newLength;
  }
});

export default Collection;
