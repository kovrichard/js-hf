/**
 * Render template with values
 */
module.exports = (objectRepository, viewName) => {
    return (req, res) => {
        res.end('Render: ' + viewName);
        // res.render(viewName, res.tpl);
    };
};
