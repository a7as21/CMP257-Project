document.getElementById('profilePhotoInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function toggleEdit() {
    document.querySelector('.edit').classList.add('d-none');
    document.querySelector('.save').classList.remove('d-none');
    document.querySelector('.cancel').classList.remove('d-none');

    let editableFields = document.querySelectorAll('.editable');
    editableFields.forEach(field => {
        if (field.tagName === 'SPAN') {
            let text = field.innerText;
            let input = document.createElement("input");
            input.type = "text";
            input.value = text;
            input.classList.add("form-control", "d-inline-block", "w-100");
            field.innerHTML = "";
            field.appendChild(input);
        } else if (field.tagName === 'P' || field.tagName === 'DIV') {
            let text = field.innerText;
            let textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.classList.add("form-control");
            textarea.rows = 3;
            field.innerHTML = "";
            field.appendChild(textarea);
        } else if (field.tagName === 'SELECT') {
            field.disabled = false;
        }
    });
}

function saveChanges() {
    let editableFields = document.querySelectorAll('.editable');
    editableFields.forEach(field => {
        if (field.tagName === 'SPAN') {
            let input = field.querySelector("input");
            if (input) {
                field.innerText = input.value;
            }
        } else if (field.tagName === 'P' || field.tagName === 'DIV') {
            let textarea = field.querySelector("textarea");
            if (textarea) {
                field.innerText = textarea.value;
            }
        } else if (field.tagName === 'SELECT') {
            field.disabled = true;
        }
    });

    document.querySelector('.edit').classList.remove('d-none');
    document.querySelector('.save').classList.add('d-none');
    document.querySelector('.cancel').classList.add('d-none');
}

function cancelEdit() {
    location.reload();
}

// Disable preferences dropdowns initially
document.addEventListener('DOMContentLoaded', function () {
    let dropdowns = document.querySelectorAll('.editable');
    dropdowns.forEach(field => {
        if (field.tagName === 'SELECT') {
            field.disabled = true;
        }
    });
});
