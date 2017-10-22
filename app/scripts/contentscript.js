// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`)

// $('*').mouseenter((e) => {
//   $(e.target).addClass('test')
// }).mouseleave((e) => {
//   $(e.target).removeClass('test')
// })

var selected = null

function clearSelected() {
  var ele = document.getElementsByClassName(selectedClass)
  if (ele.length > 0) {
    document.getElementsByClassName(selectedClass)[0] &&
      document.getElementsByClassName(selectedClass)[0].classList.remove(selectedClass)
  }
}

function selectParent() {

}

var selectedClass = 'test-selected'
document.querySelectorAll('*').forEach((item) => {
  item.addEventListener('mouseenter', (e) => {
    e.target.classList.add('test')
  })
  item.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('test')
  })

  item.addEventListener('click', (e) => {
    console.log('e.target', e.target)
    clearSelected()
    e.target.classList && e.target.classList.add(selectedClass)
    e.stopPropagation()
    e.preventDefault()
    return false
  }, false)

})

document.addEventListener('keyup', (e) => {
  console.log('e', e)
})

var overlay = document.createElement('div')
overlay.className = 'overlay'
// document.body.appendChild(overlay)
console.log('22')
