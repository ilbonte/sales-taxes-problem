
module.exports = class Cart {
  constructor(lines){
    this.products=[];
    lines.forEach(line => {
      products.push = new Product(line);
    });
  }
};
