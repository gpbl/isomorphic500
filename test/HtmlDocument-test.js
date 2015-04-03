
import React from "react/addons";
import HtmlDocument from "../src/server/HtmlDocument";
import jsdom from "mocha-jsdom";
import { expect } from "chai";

const TestUtils = React.addons.TestUtils;

describe("server/HtmlDocument", () => {

  let css = ["http://example.com/main.css"];
  let js = ["http://example.com/main.js", "http://example.com/main.hot.js"];
  let state = "window.App = { state: true }";
  let markup = "<p>Hello world</p>";

  jsdom();

  it("creates a div#root node into <body>", (done) => {
    var htmlDoc = TestUtils.renderIntoDocument(
      <HtmlDocument />
    );
    const body = TestUtils.findRenderedDOMComponentWithTag(htmlDoc, "body");

    let divs = TestUtils.scryRenderedDOMComponentsWithTag(body, "div");
    divs = divs.filter(div => div.getDOMNode().getAttribute("id") === "root");

    expect(divs).to.have.length(1);

    done();

  });

  it("render markup inside the #root node", (done) => {
    var htmlDoc = TestUtils.renderIntoDocument(
      <HtmlDocument markup={markup} />
    );
    const body = TestUtils.findRenderedDOMComponentWithTag(htmlDoc, "body");

    let divs = TestUtils.scryRenderedDOMComponentsWithTag(body, "div");
    divs = divs.filter(div => div.getDOMNode().getAttribute("id") === "root");

    expect(divs[0].getDOMNode().innerHTML).to.equal(markup);

    done();
  });

  it("includes css <link>s into <head>", (done) => {
    var htmlDoc = TestUtils.renderIntoDocument(
      <HtmlDocument css={css} />
    );
    const head = TestUtils.findRenderedDOMComponentWithTag(htmlDoc, "head");

    let links = TestUtils.scryRenderedDOMComponentsWithTag(head, "link");
    links = links.filter(link => css.indexOf(link.getDOMNode().getAttribute("href")) > -1);

    expect(links).to.have.length(1);

    done();
  });

  it("includes js <script>s into <body>", (done) => {
    var htmlDoc = TestUtils.renderIntoDocument(
      <HtmlDocument script={js} />
    );
    const body = TestUtils.findRenderedDOMComponentWithTag(htmlDoc, "body");

    let scripts = TestUtils.scryRenderedDOMComponentsWithTag(body, "script");
    scripts = scripts.filter(script => js.indexOf(script.getDOMNode().getAttribute("src")) > -1);

    expect(scripts).to.have.length(2);

    done();
  });

  it("exposes a js state", (done) => {
    var htmlDoc = TestUtils.renderIntoDocument(
      <HtmlDocument state={state} />
    );
    const body = TestUtils.findRenderedDOMComponentWithTag(htmlDoc, "body");

    let scripts = TestUtils.scryRenderedDOMComponentsWithTag(body, "script");
    scripts = scripts.filter(script => script.getDOMNode().innerHTML === state);

    expect(scripts).to.have.length(1);

    done();
  });

});
