/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getOrders : function(req, res) {
        return res.send('Lel');
    },
    getOrderForm : function(req, res) {
        res.view('order/index');
    },
    postOrderForm : function(req, res) {

    }
};

