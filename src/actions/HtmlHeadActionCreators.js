import Actions from "../constants/Actions";

const HtmlHeadActionCreators = {

  setHtmlHead(context, payload, done) {
    context.dispatch(Actions.SET_HTML_HEAD, payload);
    done();
  }

};

export default HtmlHeadActionCreators;
