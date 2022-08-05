import Collection from '../app/scripts/models/collection.js';

describe('collection', function () {

  function DummyItem(args) {
    this.foo = args.foo;
  }
  DummyItem.prototype.serialize = function () {
    return { foo: this.foo };
  };

  it('should initialize with list of items', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }]
    });
    expect(collection).toHaveProperty('items');
    expect(collection.items).toHaveLength(2);
    collection.items.forEach(function (item) {
      expect(item).toBeInstanceOf(DummyItem);
    });
  });

  it('should serialize to a JSON object', function () {
    let serializedCollection = { items: [{ foo: 'abc' }, { foo: 'xyz' }] };
    let collection = new Collection({
        SubCollectionItem: DummyItem,
        items: serializedCollection.items
    });
    expect(collection.serialize()).toEqual(serializedCollection);
  });

  it('should get item by its index', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }]
    });
    expect(collection.get(0)).toHaveProperty('foo', 'abc');
    expect(collection.get(1)).toHaveProperty('foo', 'xyz');
  });

  it('should insert new item', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }]
    });
    collection.insert(1, { foo: 'def' });
    expect(collection.items).toHaveLength(3);
    expect(collection.items[1]).toHaveProperty('foo', 'def');
    expect(collection.items[1]).toBeInstanceOf(DummyItem);
  });

  it('should remove existing item', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'def' }]
    });
    collection.remove(1);
    expect(collection).toHaveLength(2);
    expect(collection.items[0]).toHaveProperty('foo', 'abc');
    expect(collection.items[1]).toHaveProperty('foo', 'def');
  });

  it('should iterate over items', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'def' }]
    });
    let iteratedItems = [];
    collection.forEach(function (item) {
      iteratedItems.push(item);
    });
    expect(iteratedItems).toEqual(collection.items);
  });

  it('should filter items', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'bef' }, { foo: 'ghi' }]
    });
    let itemsWithoutB = collection.filter(function (item) {
      return item.foo.indexOf('b') === -1;
    });
    expect(itemsWithoutB).toHaveLength(2);
    expect(itemsWithoutB[0]).toHaveProperty('foo', 'xyz');
    expect(itemsWithoutB[1]).toHaveProperty('foo', 'ghi');
  });

  it('should map items', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'def' }]
    });
    let iteratedItems = collection.map(function (item) {
      return item;
    });
    expect(iteratedItems).toEqual(collection.items);
  });

  it('should get collection length', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'def' }]
    });
    expect(collection.length).toEqual(3);
  });

  it('should set collection length', function () {
    let collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{ foo: 'abc' }, { foo: 'xyz' }, { foo: 'def' }]
    });
    collection.length = 0;
    expect(collection.length).toEqual(0);
    expect(collection.items.length).toEqual(0);
  });

});
