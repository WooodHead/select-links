// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`)

// $('*').mouseenter((e) => {
//   $(e.target).addClass('test')
// }).mouseleave((e) => {
//   $(e.target).removeClass('test')
// })
document.querySelectorAll('*').forEach((item) => {
  item.addEventListener('mouseenter', (e) => {
    e.target.classList.add('test')
  })
  item.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('test')
  })

  item.addEventListener('click', (e) => {
    var ele = document.getElementsByClassName('test-click')
    console.log('ele', ele)
    if (ele.length > 0) {
      document.getElementsByClassName('test-click')[0] && document.getElementsByClassName('test-click')[0].classList.remove('test-click')
    }
    // e.target.classList.add('test-click')
    // e.stopPropagation()
    // e.preventDefault()
    return false
  })

})

document.addEventListener('keyup', (e) => {
  console.log('e', e)
})

var overlay = document.createElement('div')
overlay.className = 'overlay'
// document.body.appendChild(overlay)
console.log('12322')
