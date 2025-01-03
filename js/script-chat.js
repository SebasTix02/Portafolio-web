
  const buttonChat = document.querySelector('.button-chat');
  const containerChat = document.querySelector('.container-chat');
  const closeChat = document.querySelector('.close');

  buttonChat.addEventListener('click', () => {
    containerChat.classList.toggle('hidden');
  });


  closeChat.addEventListener('click', () => {
    containerChat.classList.add('hidden');
  });

  