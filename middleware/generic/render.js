/**
 * Render template with values
 */
module.exports = (objectRepository, viewName) => {
    return (req, res) => {
        console.log(`Render: ${viewName}`);
        res.end('Render: ' + viewName);
        // res.render(viewName, res.tpl);
    };
};
