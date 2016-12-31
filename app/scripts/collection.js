'use strict';

// A general container for any type of collection
function Collection(SubCollectionItem, itemDicts) {
  var collection = this;
  // A reference to the sub-collection's item constructor
  collection.SubCollectionItem = SubCollectionItem;
  collection.items = itemDicts.map(function (itemDict) {
    return new SubCollectionItem(itemDict);
  });
}

// Retrieve the collection item at the given index
Collection.prototype.get = function (itemIndex) {
  return this.items[itemIndex];
};

// Insert the given collection item dictionary at the given index
Collection.prototype.insert = function (itemIndex, itemDict) {
  return this.items.splice(itemIndex, 0, new this.SubCollectionItem(itemDict));
};

Collection.prototype.forEach = function (callback) {
  return this.items.forEach(callback);
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

module.exports = Collection;
