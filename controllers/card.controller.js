const axios = require('axios').default

exports.findLatestTen = (req, res) => {
  const {
    pageSize = '10',
    q = '',
    page = '1',
    orderBy = '-set.releaseDate,name'
  } = req.query

  const options = {
    method: 'GET',
    url: `${process.env.POKEMON_API_URL}/cards`,
    params: {
      pageSize,
      q,
      page,
      orderBy
    },
    headers: {
      'X-Api-Key': process.env.POKEMON_API_KEY
    }
  }

  axios.request(options)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error.message)
    })
}
