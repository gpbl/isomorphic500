var React = require("react");
var Page = require('../components/Page.jsx');
React.render(
    <Page {...props} />,
    document.getElementById('mountNode')
);