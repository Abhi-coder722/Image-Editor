const fileInput = document.querySelector('.file-input'),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    chooseImgBtn = document.querySelector(".choose-img"),
    resetFilterBtn = document.querySelector(".reset-filter");
    saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


const loadImage = () => {
    let file = fileInput.files[0]; //getting the user selected files
    if (!file) return; // return if user hasn't chosen any file
    previewImg.src = URL.createObjectURL(file); //passing file url as the source
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { //adding the click event listener to all the buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = '200';
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if (option.id === "saturation") {
            filterSlider.max = '200';
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if (option.id === "inversion") {
            filterSlider.max = '100';
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else {
            filterSlider.max = '100';
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    var t = filterSlider.value;
    filterValue.innerText = t + '%';
    const selectedFilter = document.querySelector(".filter .active"); //getting selected
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }
    else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    }
    else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }
    else {
        grayscale = filterSlider.value;
    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {//adding the click event listener to all the rotate buttons

        if (option.id === "left") {
            rotate -= 90;//if the left btn is clicked , decrement the rotate by 90
        } else if (option.id === "right") {
            rotate += 90;//if the left btn is clicked , increment the rotate by 90
        }
        else if (option.id === "horizontal") {
            //if flip horizontal value is 1 , set it to -1 orelse 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            //if flipVertical value is 1 , set it to -1 orelse 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilter = () => {
    //resetting everythin to its default value
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); //clicking brightness btn , so the brightness will be clicked when we reset the image 
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
