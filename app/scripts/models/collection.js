// An abstract base model for defining any type of ordered sequence
function Collection(args) {
  // A reference to the constructor for the sub-collection's item type
  this.SubCollectionItem = args.SubCollectionItem;
  this.items = args.items.map(function (item) {
    return new args.SubCollectionItem(item);
  });
}

Collection.prototype.get = function (itemIndex) {
  return this.items[itemIndex];
};

Collection.prototype.insert = function (itemIndex, item) {
  // This method will automatically convert the given property map into the
  // correct item type for the sub-collection instance
  return this.items.splice(itemIndex, 0, new this.SubCollectionItem(item));
};

Collection.prototype.remove = function (itemIndex) {
  return this.items.splice(itemIndex, 1);
};

Collection.prototype.forEach = function (callback) {
  return this.items.forEach(callback);
};

Collection.prototype.filter = function (callback) {
  return this.items.filter(callback);
};

Collection.prototype.map = function (callback) {
  return this.items.map(callback);
};

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

Collection.prototype.serialize = function () {
  return {
    items: this.items.map(function (item) {
      return item.serialize();
    })
  };
};

export default Collection;
