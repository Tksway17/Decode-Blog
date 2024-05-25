const options = document.querySelectorAll('.icon');

options.forEach(option => {
  option.addEventListener('click', function(event){
    event.preventDefault(); 
    const modal = this.nextElementSibling; // получаем следующий элемент после иконки, который является модальным окном
    modal.classList.toggle('open');
  });
});

// При клике на документ проверяем, был ли клик сделан вне модального окна и вне иконки
document.addEventListener('click', function(event){
  const modalWindows = document.querySelectorAll('.modal-window');
  modalWindows.forEach(modalWindow => {
    const icon = modalWindow.previousElementSibling; // получаем предыдущий элемент перед модальным окном, который является иконкой
    if (!modalWindow.contains(event.target) && !icon.contains(event.target)) {
      modalWindow.classList.remove('open');
    }
  });
});
