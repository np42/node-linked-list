module.exports =

/** Ring */

this.Ring = function (head, tail) {
  this.head = head || null;
  this.tail = tail || null;
};

this.Ring.prototype.toArray = function () {
  var list = [];
  for (var cursor = this; cursor != null; cursor = cursor.tail)
    list.push(cursor.head);
  return list;
};

this.Ring.prototype.fold = function (fn, accu) {
  for (var cursor = this; cursor != null; cursor = cursor.tail)
    accu = fn(cursor.head);
  return accu;
};

this.Ring.prototype.foldAsync = function (fn, accu, callback) {
  var tail = this.tail;
  if (tail != null) {
    return fn(this.head, accu, function (err, accu) {
      if (err) return callback(err);
      else return tail.fold(fn, accu, callback);
    });
  } else {
    return fn(this.head, accu, callback);
  }
};

this.Ring.prototype.set = function (identity) {
  for (var cursor = this; cursor != null; cursor = cursor.tail)
    if (cursor.head === identity)
      return this;
  return new Yolo.Ring(identity, this);
};

this.Ring.prototype.indexOf = function (identity) {
  var index = 0;
  for (var cursor = this; cursor != null; cursor = cursor.tail)
    if (cursor.head === identity)
      return index;
  return -1;
};

this.Ring.prototype.remove = function (identity) {
  if (this.head === identity) return this.tail;
  for (var cursor = this; true; cursor = cursor.tail) {
    if (cursor.tail == null) return this;
    if (cursor.tail.head != identity) continue ;
    cursor.tail = cursor.tail.tail;
    return this;
  }
};

this.Ring.prototype.without = function (identity) {
  var list = this.toList();
  var previous = null;
  while (list.length > 0) {
    var element = list.pop();
    if (identity === element) continue ;
    previous = new Yolo.Ring(element, previous);
  }
  return previous;
};
