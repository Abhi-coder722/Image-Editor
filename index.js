const fileInput=document.querySelector('.file-input'),
filterOptions=document.querySelectorAll(".filter button");
filterName=document.querySelector(".filter-info .name"),
filterValue=document.querySelector(".filter-info .value"),
filterSlider=document.querySelector(".slider input"),
previewImg=document.querySelector(".preview-img img"),
chooseImgBtn=document.querySelector(".choose-img");

const loadImage= () => {
    let file = fileInput.files[0]; //getting the user selected files
    if(!file) return; // return if user hasn't chosen any file
    previewImg.src = URL.createObjectURL(file); //passing file url as the source
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option =>{
    option.addEventListener("click", () => { //adding the click event listener to all the buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
    })
});

const updateFilter = () => {
    console.log(filterSlider.value);
    var t=filterSlider.value;
    filterValue.innerText= t+'%';
}
fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
