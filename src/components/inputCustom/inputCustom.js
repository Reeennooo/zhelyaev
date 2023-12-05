let fileInputs = document.querySelectorAll('.input-file');

function handleFiles() {
    const fileList = this.files;
    const filesArr = Object.values(fileList);
    const allChooseFiles = filesArr.map((file) => {
        return file.name;
    });
    const fileInfo = document.querySelector('.submit-application__file-info');
    fileInfo.innerText = `${allChooseFiles.length > 1 ? 'Выбранные файлы:' : 'Выбранный файл:'} ${allChooseFiles.join(', ')}`;
}

fileInputs.forEach((input) => {
    input.addEventListener('change', handleFiles);
});
