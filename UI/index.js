const baseUrl = 'http://localhost:3000'
const formTitleId = '#formTitle';
const formBodyId = '#formBody';
const formNoteId = '#formNoteId';
const submitBtnId = '#submitBtn';
const updateBtnId = '#updateBtn';

function fetchNotelist(){
  const noteListId = '#noteList';

  $.ajax({
    url: `${baseUrl}/notes`,
    type: 'GET',
    success: function(data) {
      let htmlData = "";

      data.forEach(note => {
        htmlData += `
          <div class="card mb-4">
            <h5 class="card-header bg-warning">
              <div class="d-flex justify-content-between">
              ${note.title}
              <span>
              <i class="bi bi-pen text-dark me-3" style="cursor: pointer" onclick="updateNoteClicked(${note.id})"></i>
              <i class="bi bi-trash" style="cursor: pointer" onclick="deleteNote(${note.id})"></i>
              </span>
              </div>  
            </h5>
            <div class="card-body">
              ${note.body}
            </div>
          </div>
        `;
      })
      $(noteListId).empty();
      $(noteListId).append(htmlData);
    },
    error: function(message, status, error) {
      showDialogMessage("Error", message.responseJSON.message, "error")
    }
  });
}

function deleteNoteFromDb(id){
  $.ajax({
    url: `${baseUrl}/notes/${id}`,
    method: 'DELETE',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      'accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    success: function(response) {
      showDialogMessage("Success", response.message, "success")
      fetchNotelist();
    },
    error: function(message, status, error) {
      showDialogMessage("Error", message.responseJSON.message, "error")
    }
  });
}

function updateoteFromDb(){
  const updatedNote = {
    id: $(formNoteId).val(),
    title: $(formTitleId).val(),
    body: $(formBodyId).val()
  };

  $.ajax({
    url: `${baseUrl}/notes/${updatedNote.id}`,
    method: 'PATCH',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      'accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(updatedNote),
    success: function(response) {
      response;
      showDialogMessage("Success", response.message, "success")
      fetchNotelist();
    },
    error: function(message, status, error) {
      showDialogMessage("Error", message.responseJSON.message, "error")
    }
  });

  // Clear input fields
  clearInputFields();
}

function updateNoteClicked(id){
  $.ajax({
    url: `${baseUrl}/notes/${id}`,
    type: 'GET',
    success: function(data) {
      $(formNoteId).val(data.id);
      $(formTitleId).val(data.title);
      $(formBodyId).val(data.body);
      $(submitBtnId).hide();
      $(updateBtnId).removeClass('d-none');
    },
    error: function(message, status, error) {
      showDialogMessage("Error", message.responseJSON.message, "error")
    }
  });
}

function deleteNote(id) {
  const result = confirm("Are you sure you want to delete a note?");
  if (result) deleteNoteFromDb(id);
}

function clearInputFields(){
  $(formNoteId).val('');
  $(formTitleId).val('');
  $(formBodyId).val('');
  $(submitBtnId).show();
  $(updateBtnId).addClass('d-none');
}

function showDialogMessage(title, text, icon) {
  Swal.fire({ title, text, icon });
}

$(document).ready(function() {
  $('#noteForm').submit(function(event) {
    event.preventDefault(); 

    const newNote = {
      title: $(formTitleId).val(),
      body: $(formBodyId).val()
    };

    $.ajax({
      url: `${baseUrl}/notes`,
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(newNote),
      success: function(response) {
        showDialogMessage("Success", response.message, "success")
        fetchNotelist();
      },
      error: function(message, status, error) {
        showDialogMessage("Error", message.responseJSON.message, "error")
      }
    });

    // Clear input fields
    clearInputFields();
  });
  
  $('#refreshNoteListBtn').click(() => {
    fetchNotelist();
  });

  fetchNotelist();
});