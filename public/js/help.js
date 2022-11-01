const coll = document.getElementsByClassName('collapsible');
let i;

// eslint-disable-next-line no-plusplus
for (i = 0; i < coll.length; i++) {
  // eslint-disable-next-line func-names
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
}
