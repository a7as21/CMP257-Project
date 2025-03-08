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

// Existing functions for editing text fields
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
        }
    });

    document.querySelector('.edit').classList.remove('d-none');
    document.querySelector('.save').classList.add('d-none');
    document.querySelector('.cancel').classList.add('d-none');
}

function cancelEdit() {
    location.reload();
}