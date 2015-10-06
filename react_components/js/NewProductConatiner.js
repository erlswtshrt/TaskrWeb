var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var NewProductContainer = React.createClass({displayName: "NewProductContainer",
  createProductId: function(__productName) {
    __productName = __productName.replace(/\s+/g, '');
    return this.props.uid + __productName;
  },
  addProduct: function() {
    var id = this.createProductId(this.res.name).value.trim();

    var ref = new Firebase("https://shophopanalytics.firebaseio.com");

    var name = React.findDOMNode(this.refs.name).value.trim();
    var brand = React.findDOMNode(this.refs.brand).value.trim()
    var store = React.findDOMNode(this.refs.store).value.trim()
    var description = React.findDOMNode(this.refs.description).value.trim()
    var category = React.findDOMNode(this.refs.category).value.trim()

    var productsRef = ref.child("products");
    productsRef.child(id).set({ 
      name: name,
      brand: brand,
      store: store,
      description: description,
      category: category
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("form", null, 
          React.createElement("input", {type: "text", name: "name", placeholder: "Product Name", ref: "name"}), 
          React.createElement("input", {type: "text", name: "brand", placeholder: "Brand or Designer", ref: "brand"}), 
          React.createElement("input", {type: "text", name: "store", placeholder: "Store", ref: "store"}), 
          React.createElement("input", {type: "textarea", name: "description", placeholder: "Description", ref: "description"}), 
          React.createElement("input", {type: "text", name: "category", placeholder: "Category", ref: "category"})
        ), 
        React.createElement("div", {onClick: this.addProduct}, "Add Product")
      )
    );
  }
});

module.exports = NewProductContainer;