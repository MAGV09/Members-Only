const messagesContainer = document.querySelector('#messages-container');

messagesContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('del-msg-btn')) {
    const id = e.target.dataset.id;
    try {
      const response = await fetch(`messages/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to perform operation');
      }
      const data = response.json();
      window.location.href = `${data.redirect}`;
    } catch (err) {
      console.log(err);
    }
  }
});
