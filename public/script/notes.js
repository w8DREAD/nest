// добавить заметку
if (document.querySelector('button.add-notes')) {
  const addNotes = document.querySelector('button.add-notes');
  addNotes.addEventListener('click', async () => {
    const note = document.querySelector('textarea.form-control');
    const json = JSON.stringify({
      text: note.value,
    });
    xhr('post', '/api/v2/notes', json, 'application/json')
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => {
        const elemErr = `<div class="alert alert-warning" role="alert" id="elemErr">
          ${err.statusText}
      </div>`;
        const form = addNotes.parentNode;
        if (document.getElementById('elemErr')) {
          form.firstChild.parentNode.removeChild(form.firstChild);
        }
        return form.insertAdjacentHTML('afterbegin', elemErr);
      });
  });
}

// удалить заметку
window.addEventListener('click', (target) => {
  const targetClassName = target.target.parentNode.className;
  let idForDb;
  if (target.target.attributes.name) {
    idForDb = target.target.attributes.name.value;
  }
  if (targetClassName === 'close button notes') {
    const post = target.path.find((container) => {
      if (container.attributes.class) {
        if (container.attributes.class.value === 'articles-news') {
          return container;
        }
      }
      return false;
    });
    const deleteApply = window.confirm('Заметка удалиться со всеми комментариями!\n Вы уверены что хотите удалить заметку?');
    if (deleteApply) {
      const main = document.querySelector('div.content');
      xhr('delete', `api/v1/notes/${idForDb}`);
      main.removeChild(post);
    }
  }
});

// редактировать заметку
window.addEventListener('click', (target) => {
  const targetClassName = target.target.parentNode.className;
  let idForDb;
  if (target.target.attributes.name) {
    idForDb = target.target.attributes.name.value;
  }
  if (targetClassName === 'like edit text button') {

    return new Promise((resolve) => {
      const note = document.getElementById(`note-${idForDb}`);
      const noteText = note.innerText;
      note.setAttribute('contenteditable', 'true');
      note.style.background = '#FFFFFF';
      note.focus();
      resolve([note, noteText]);
    })
      .then(([note, noteText]) => {
        const elemNote = note;
        elemNote.onblur = function () {
          const saveChange = window.confirm('Сохранить изменения?');
          elemNote.style.background = '';
          note.setAttribute('contenteditable', 'false');
          if (saveChange) {
            const editText = `noteText=${elemNote.innerText}`;
            xhr('put', `api/v1/notes/${idForDb}`, editText)
              .catch(() => {
                elemNote.innerText = noteText;
              });
          } else {
            elemNote.innerText = noteText;
          }
        };
      });
  }
});
// поставить лайк
window.addEventListener('click', (target) => {
  const targetClassName = target.target.className;
  let idForDb;
  let response;
  if (target.target.attributes.name) {
    idForDb = target.target.attributes.name.value;
  }
  if (targetClassName === 'like') {
    const json = JSON.stringify({
      noteId: idForDb,
    });
    xhr('post', '/api/v1/likes/', json, 'application/json')
      .then((res) => {
        response = res;
        if (JSON.parse(res).status) {
          return 1;
        }
        return -1;
      })
      .then((like) => {
        const currentLikes = document.querySelector(`span.like > p[name="${idForDb}"]`);
        currentLikes.innerText = (+currentLikes.innerText + like);
        const likes = document.querySelector('h6');
        likes.innerText = `Набрано лайков: ${JSON.parse(response).likesCount}`;
        return true;
      })
      .catch(err => err);
  }
});
