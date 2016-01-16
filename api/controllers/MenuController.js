/**
 * MenuController
 *
 * @description :: Server-side logic for managing Menu
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getMenu : function(req, res) {
        Menu.find({}).exec(function(err, items) {
            return res.json(items);
        });
    }
};

