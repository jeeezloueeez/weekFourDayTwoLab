let houses = require('./db.json')

let globalId = 4

// console.log(req.body, req.params, req.query)

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses)
  },
  deleteHouse: (req, res) => {
    let index = houses.findIndex((elem) => elem.id === +req.params.id);
    houses.splice(index, 1);
    console.log(houses);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    let address = req.body.address
    let price = req.body.price
    let imageURL = req.body.imageURL
    let newHouse = {
      id: globalId,
      address,
      price,
      imageURL,
    }
    globalId++
    houses.push(newHouse)
    res.status(200).send(houses)
  },
  updateHouse: (req, res) => {
    let type = req.body.type
    let id = req.params.id
    let index = houses.findIndex((elem) => +elem.id === +id)
    if (houses[index].price === 0 && type === 'minus') {
      res.status(400).send(`You are not able to list a home for a negative amount`)
    } else if (houses[index].price > 0 && houses[index].price < 10000 && type === 'minus') {
      houses[index].price = 0
      res.status(200).send(houses)
    } else if (houses[index].price > 0 && houses[index].price > 10000 && type === 'minus') {
      houses[index].price -= 10000
      res.status(200).send(houses)
    } else if (houses[index].price >= 0 && type === 'plus') {
      houses[index].price += 10000
      res.status(200).send(houses)
    } else {
      res.sendStatus(400)
    }
  }
}