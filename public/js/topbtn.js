const mybutton = document.getElementById('myBtn');
// eslint-disable-next-line func-names
window.onscroll = function () {
  // eslint-disable-next-line no-use-before-define
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}
mybutton.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
