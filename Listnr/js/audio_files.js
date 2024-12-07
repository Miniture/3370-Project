var audioFiles = [];
var customAudioFiles = [];
var isAdmin = false;

document.getElementById('basicAccountBtn').addEventListener('click', function() {
    signIn('listnruser172');
});

document.getElementById('adminAccountBtn').addEventListener('click', function() {
    signIn('listnradmin172');
});

function signIn(password) {
    fetch(`http://localhost/Listnr/php/check_if_admin.php?password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.text())
    .then(data => {
        isAdmin = data === '1';
        console.log("Admin privilege:", isAdmin);
        updateAdminRows(isAdmin);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

function getAudioFiles() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/Listnr/php/audio_files.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            audioFiles = JSON.parse(xhr.responseText);
            console.log(audioFiles);

            document.getElementById("audioRecords").innerHTML = generateAudioTable(audioFiles.slice(0, 3), "Spanish") +
                generateAudioTable(audioFiles.slice(3, 6), "German");
            document.getElementById("customAudioTable").innerHTML = generateCustomAudioRowInit(audioFiles.slice(6));
            updateAdminRows(isAdmin);
        } else {
            console.error('Error fetching data:', xhr.statusText);
        }
    };
    xhr.send();
}

window.onload = getAudioFiles;

function generateAudioTable(audioFiles, language) {
    let htmlContent = `<h3>${language} Audio Recordings</h3>`;
    htmlContent += '<table>';

    audioFiles.forEach((audio) => {
        htmlContent += `
            <tr data-id="${audio.audioID}" class="adminOnly">
                <td>${audio.audioID}</td>
                <td>${audio.audioName}</td>
                <td>
                    <audio controls class="audioPlayer">
                        <source src="${audio.audioFile}" type="audio/mp3">
                    </audio>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
                </td>
            </tr>
        `;
    });

    htmlContent += '</table>';
    return htmlContent;
}

function deleteRow(button) {
    var row = button.closest("tr");
    var deletedRowID = row.getAttribute('data-id');
    console.log('Deleted row ID:', deletedRowID);

    fetch('http://localhost/Listnr/php/audio_files.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audioID: deletedRowID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            row.remove();
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting audio:', error);
    });
}

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function addNewAudio() {
    var audioName = document.getElementById("audioName").value;
    var audioFile = document.getElementById("audioFile").files[0];

    if (!audioName || !audioFile) {
        alert("Please provide both a name and an audio file.");
        return;
    }

    var formData = new FormData();
    formData.append('audioName', audioName);
    formData.append('audioFile', audioFile);

    fetch('http://localhost/Listnr/php/add_audio.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            customAudioFiles.push(data.audio);
            document.getElementById("customAudioTable").innerHTML += generateCustomAudioRow(data.audio);
            closeModal();
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error adding audio:', error);
    });
}

function generateCustomAudioRow(audio) {
    return `
        <tr data-id="${audio.audioID}">
            <td>${audio.audioID}</td>
            <td>${audio.audioName}</td>
            <td>
                <audio controls class="audioPlayer">
                    <source src="${audio.audioFile}" type="audio/mp3">
                </audio>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
        </tr>
    `;
}

function generateCustomAudioRowInit(audio) {
    let htmlContent = '';
    audio.forEach((audioFile) => {
        htmlContent += `
            <tr data-id="${audioFile.audioID}">
                <td>${audioFile.audioID}</td>
                <td>${audioFile.audioName}</td>
                <td>
                    <audio controls class="audioPlayer">
                        <source src="${audioFile.audioFile}" type="audio/mp3">
                    </audio>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
                </td>
            </tr>
        `;
    });
    return htmlContent;
}

function updateAdminRows(isAdmin) {
    const adminRows = document.querySelectorAll('.adminOnly .delete-btn');
    adminRows.forEach(button => {
        if (isAdmin) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}
