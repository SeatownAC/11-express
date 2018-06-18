'use strict';

// Models should offload their data storage to another module/system.
// Here, we'll be using a custom data store module of our own creation
const storage = require('../lib/storage/data-store.js');
const uuid = require('uuid/v1');

class Cookie{ //formerly class Note


  constructor(config) {
    this.id = uuid();
    this.madeOn = new Date();
    this.flavor = config && config.flavor || '';
    this.size = config && config.size || '';
  }

 
  save() {
    return storage.save(this);
  }

  /**
   * The functions below are all "static" methods on this model.
   * Simply put, that means that you can't use them on instances of this model, but
   * rather use them as top level functions.
   * i.e.
   *    This will use the instance method "save" to save the people we just created
   *    let myNote = new Note({title:'Hi',address:'There'});
   *    myNote.save();
   *
   *    To view a single people you would call the method on the constructor istelf:
   *    Note.fetchOne(id)
   *
   * Note that all of the below methods contain calls on our external storage mechanism
   * to perform their operations
   *
   * @returns {*}
   */
  static fetchAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(criteria) {
    return storage.update(this);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

}

module.exports = Cookie;