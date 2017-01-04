'use strict';

// A general container for any ordered sequence of items
function Collection(SubCollectionItem, itemDicts) {
  var collection = this;
  // A reference to the constructor for the sub-collection's item type
  collection.SubCollectionItem = SubCollectionItem;
  collection.items = itemDicts.map(function (itemDict) {
    return new SubCollectionItem(itemDict);
  });
}

Collection.prototype.get = function (itemIndex) {
  return this.items[itemIndex];
};

Collection.prototype.insert = function (itemIndex, itemDict) {
  // This method will automatically convert the given property map into the
  // correct item type for the sub-collection instance
  return this.items.splice(itemIndex, 0, new this.SubCollectionItem(itemDict));
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

module.exports = Collection;
