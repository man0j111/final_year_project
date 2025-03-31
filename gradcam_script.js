document.addEventListener("DOMContentLoaded", function () {
    const tumorDropdown = document.getElementById("tumor-type");
    const blockDropdown = document.getElementById("block-number");
    const imageGallery = document.getElementById("image-gallery");

    // Sample dataset structure (Replace with actual filenames)
    const gradcamImages = {
        glioma: ["block1", "block2", "block3"],
        meningioma: ["block1", "block2"],
        pituitary: ["block1", "block3"]
    };

    const imageFiles = {
        glioma: {
            block1: ["GradCAM_glioma_tumor_block1_conv1.png", "GradCAM_glioma_tumor_block1_conv2.png"],
            block2: ["GradCAM_glioma_tumor_block2_conv1.png", "GradCAM_glioma_tumor_block2_conv2.png"],
            block3: ["GradCAM_glioma_tumor_block3_conv1.png"]
        },
        meningioma: {
            block1: ["GradCAM_meningioma_tumor_block1_conv1.png"],
            block2: ["GradCAM_meningioma_tumor_block2_conv1.png"]
        },
        pituitary: {
            block1: ["GradCAM_pituitary_tumor_block1_conv1.png"],
            block3: ["GradCAM_pituitary_tumor_block3_conv3.png"]
        }
    };

    // Populate block dropdown based on tumor selection
    tumorDropdown.addEventListener("change", function () {
        blockDropdown.innerHTML = '<option value="">--Select--</option>'; // Reset block selection
        const selectedTumor = tumorDropdown.value;
        if (selectedTumor && gradcamImages[selectedTumor]) {
            gradcamImages[selectedTumor].forEach(block => {
                let option = document.createElement("option");
                option.value = block;
                option.textContent = block;
                blockDropdown.appendChild(option);
            });
        }
        imageGallery.innerHTML = ""; // Clear images when changing tumor type
    });

    // Load images when block is selected
    blockDropdown.addEventListener("change", function () {
        const selectedTumor = tumorDropdown.value;
        const selectedBlock = blockDropdown.value;
        imageGallery.innerHTML = ""; // Clear previous images

        if (selectedTumor && selectedBlock && imageFiles[selectedTumor][selectedBlock]) {
            imageFiles[selectedTumor][selectedBlock].forEach(imageName => {
                let imgElement = document.createElement("img");
                imgElement.src = `gradcam_vgg16/${imageName}`; // Adjust folder path
                imgElement.alt = imageName;
                imageGallery.appendChild(imgElement);
            });
        }
    });
});
