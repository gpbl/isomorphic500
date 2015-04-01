import { BaseStore } from "fluxible/addons";

class FoobarStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.bar = true;
  }

  getState() {
    return {
      bar: this.bar
    };
  }

  handleFoo(payload) {
    this.bar = payload.bar;
    this.emitChange();
  }

}

FoobarStore.storeName = "FoobarStore";
FoobarStore.handlers = {
  "FOO": "handleFoo"
};

export default FoobarStore;
