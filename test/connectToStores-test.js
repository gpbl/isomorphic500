
import React from "react/addons";
import connectToStores from "../src/utils/connectToStores";
import jsdom from "jsdom";
import { expect } from "chai";

import { FluxibleComponent } from "fluxible";
import { createMockComponentContext } from "fluxible/utils";

import FoobarStore from "./mocks/FoobarStore";
import FooComponent from "./mocks/FooComponent";
import fooAction from "./mocks/fooAction";

const TestUtils = React.addons.TestUtils;

const MockComponentContext = createMockComponentContext();
MockComponentContext.registerStore(FoobarStore);

describe("utils/connectToStores", () => {
  let componentContext;

  const Component = connectToStores(FooComponent, [FoobarStore], (foobarStore) => {
    return foobarStore.getState();
  });

  beforeEach((done) => {
    componentContext = new MockComponentContext();
    jsdom.env("<html><body></body></html>", [], (err, window) => {
      if (err) {
        throw (err);
      }

      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;
      done();
    });
  });

  afterEach(function() {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it("returns a component as wrapper", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component />
      </FluxibleComponent>
    );

    expect(TestUtils.isCompositeComponent(component)).to.be.ok;

    done();

  });

  it("the wrapped component is the original component", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component />
      </FluxibleComponent>
    );

    const fooInstance = TestUtils.findRenderedComponentWithType(component, FooComponent);

    expect(TestUtils.isCompositeComponentWithType(fooInstance, FooComponent)).to.be.ok;

    done();

  });

  it("the original props are preserved", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component originalFoo="originalBar" />
      </FluxibleComponent>
    );

    const fooInstance = TestUtils.findRenderedComponentWithType(component, FooComponent);

    expect(fooInstance.props.originalFoo).to.equal("originalBar");

    done();

  });

  it("the fluxibile context is passed to the component as prop", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component foo="bar" />
      </FluxibleComponent>
    );

    const fooInstance = TestUtils.findRenderedComponentWithType(component, FooComponent);

    expect(fooInstance.props).to.include.keys("bar");
    expect(fooInstance.props.context.executeAction).to.be.a("function");
    expect(fooInstance.props.context.getStore).to.be.a("function");

    done();

  });

  it("the intial store’s state is passed as prop", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component />
      </FluxibleComponent>
    );

    const fooInstance = TestUtils.findRenderedComponentWithType(component, FooComponent);

    expect(fooInstance.props.bar).to.be.ok;

    done();

  });

  it("the props passed to the component are updated when the store changes", (done) => {
    const component = TestUtils.renderIntoDocument(
      <FluxibleComponent context={componentContext}>
        <Component />
      </FluxibleComponent>
    );

    const fooInstance = TestUtils.findRenderedComponentWithType(component, FooComponent);
    expect(fooInstance.props.bar).to.equal(true);

    componentContext.executeAction(fooAction, { bar: false });
    expect(fooInstance.props.bar).to.equal(false);

    done();

  });

});
