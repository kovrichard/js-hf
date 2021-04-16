/**
 * Render template with values, if anything is in res.locals, else do nothing
 */
module.exports = (objectRepository, viewName) => {
    return (req, res) => {
        console.log(`Render: ${viewName}`);
        res.render(viewName, res.locals);
    };
};
