export default class Tools {
  say () {
    console.log('asdf')

    setInterval(() => {
      $('#test').text(Math.random() * 1000)
    }, 200)
  }
}
