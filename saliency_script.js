document.addEventListener("DOMContentLoaded", function () {
    const tumorDropdown = document.getElementById("tumor-type");
    const blockDropdown = document.getElementById("block-number");
    const convDropdown = document.getElementById("conv-layer");
    const imageGallery = document.getElementById("image-gallery");

    // Sample dataset structure (Replace with actual filenames)
    const saliencyImages = {
        glioma: ["block1", "block2", "block3","block4","block5"],
        meningioma: ["block1", "block2","block3","block4","block5"],
        pituitary: ["block1", "block2","block3","block4","block5"],
        no_tumor: ["block1", "block2","block3","block4","block5"]
    };

    const convLayers = ["conv1", "conv2", "conv3","conv4"]; // Available conv layers

    const imageFiles = {
        glioma: {
            block1: {
                conv1: ["Saliency_glioma_tumor_block1_conv1_image(55).jpg.png"],
                conv2: ["Saliency_glioma_tumor_block1_conv2_image(55).jpg.png"],
                conv3: ["Saliency_glioma_tumor_block1_conv3_image(55).jpg.png"]
            },
            block2: {
                conv1: ["Saliency_glioma_tumor_block2_conv1_image(55).jpg.png"],
                conv2: ["Saliency_glioma_tumor_block2_conv2_image(55).jpg.png"]
            },
            block3: {
                conv1: ["Saliency_glioma_tumor_block3_conv1_image(55).jpg.png"],
                conv2: ["Saliency_glioma_tumor_block3_conv2_image(55).jpg.png"],
                conv3: ["Saliency_glioma_tumor_block3_conv3_image(55).jpg.png"]
            },
            block4: {
                conv1: ["Saliency_glioma_tumor_block4_conv1_image(55).jpg.png"],
                conv2: ["Saliency_glioma_tumor_block4_conv2_image(55).jpg.png"],
                conv3: ["Saliency_glioma_tumor_block4_conv3_image(55).jpg.png"]
            },
            block5: {
                conv1: ["Saliency_glioma_tumor_block5_conv1_image(55).jpg.png"],
                conv2: ["Saliency_glioma_tumor_block5_conv2_image(55).jpg.png"],
                conv3: ["Saliency_glioma_tumor_block5_conv3_image(55).jpg.png"]
            }
        },
        meningioma: {
            block1: {
                conv1: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block1_conv1_Meningioma_test_496.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block1_conv2_Meningioma_test_496.jpg.png"]
            },
            block2: {
                conv1: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block2_conv1_Meningioma_test_496.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block2_conv2_Meningioma_test_496.jpg.png"]
            },
            block3: {
                conv1: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block3_conv1_Meningioma_test_496.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block3_conv2_Meningioma_test_496.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block3_conv3_Meningioma_test_496.jpg.png"]

            },
            block4: {
                conv1: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block4_conv1_Meningioma_test_496.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block4_conv2_Meningioma_test_496.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block4_conv3_Meningioma_test_496.jpg.png"]

            },
            block5: {
                conv1: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block5_conv1_Meningioma_test_496.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block5_conv2_Meningioma_test_496.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_meningioma_tumor_block5_conv3_Meningioma_test_496.jpg.png"]

            }
        },
        no_tumor: {
            block1: {
                conv1: ["Saliency_no_tumor_block1_conv1_healthy (402).jpg.png"],
                conv2: ["Saliency_no_tumor_block1_conv2_healthy (402).jpg.png"]
            },
            block2: {
                conv1: ["Saliency_no_tumor_block2_conv1_healthy (402).jpg.png"],
                conv2: ["Saliency_no_tumor_block2_conv2_healthy (402).jpg.png"]
            },
            block3: {
                conv1: ["Saliency_no_tumor_block3_conv1_healthy (402).jpg.png"],
                conv2: ["Saliency_no_tumor_block3_conv2_healthy (402).jpg.png"],
                conv3: ["Saliency_no_tumor_block3_conv3_healthy (402).jpg.png"]

            },
            block4: {
                conv1: ["Saliency_no_tumor_block4_conv1_healthy (402).jpg.png"],
                conv2: ["Saliency_no_tumor_block4_conv2_healthy (402).jpg.png"],
                conv3: ["Saliency_no_tumor_block4_conv3_healthy (402).jpg.png"]

            },
            block5: {
                conv1: ["Saliency_no_tumor_block5_conv1_healthy (402).jpg.png"],
                conv2: ["Saliency_no_tumor_block5_conv2_healthy (402).jpg.png"],
                conv3: ["Saliency_no_tumor_block5_conv3_healthy (402).jpg.png"]

            }
        },
        pituitary: {
            block1: {
                conv1: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block1_conv1_Pituitary_test_1707.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block1_conv2_Pituitary_test_1707.jpg.png"]
            },
            block2: {
                conv1: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block2_conv1_Pituitary_test_1707.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block2_conv2_Pituitary_test_1707.jpg.png"]
            },
            block3: {
                conv1: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block3_conv1_Pituitary_test_1707.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block3_conv2_Pituitary_test_1707.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block3_conv2_Pituitary_test_1707.jpg.png"]

            },
            block4: {
                conv1: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block4_conv1_Pituitary_test_1707.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block4_conv2_Pituitary_test_1707.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block4_conv2_Pituitary_test_1707.jpg.png"]

            },
            block5: {
                conv1: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block5_conv1_Pituitary_test_1707.jpg.png"],
                conv2: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block5_conv2_Pituitary_test_1707.jpg.png"],
                conv3: ["saliency_Outputs_vgg16/Saliency_pituitary_tumor_block5_conv2_Pituitary_test_1707.jpg.png"]

            }
        }
    };

    // Populate block dropdown based on tumor selection
    tumorDropdown.addEventListener("change", function () {
        blockDropdown.innerHTML = '<option value="">--Select--</option>'; // Reset block selection
        convDropdown.innerHTML = '<option value="">--Select--</option>'; // Reset conv selection
        const selectedTumor = tumorDropdown.value;
        if (selectedTumor && saliencyImages[selectedTumor]) {
            saliencyImages[selectedTumor].forEach(block => {
                let option = document.createElement("option");
                option.value = block;
                option.textContent = block;
                blockDropdown.appendChild(option);
            });
        }
        imageGallery.innerHTML = ""; // Clear images when changing tumor type
    });

    // Populate conv dropdown based on block selection
    blockDropdown.addEventListener("change", function () {
        convDropdown.innerHTML = '<option value="">--Select--</option>';
        const selectedTumor = tumorDropdown.value;
        const selectedBlock = blockDropdown.value;

        if (selectedTumor && selectedBlock && imageFiles[selectedTumor][selectedBlock]) {
            convLayers.forEach(conv => {
                if (imageFiles[selectedTumor][selectedBlock][conv]) {
                    let option = document.createElement("option");
                    option.value = conv;
                    option.textContent = conv;
                    convDropdown.appendChild(option);
                }
            });
        }
        imageGallery.innerHTML = ""; // Clear images when changing block
    });

    // Load images when conv layer is selected
    convDropdown.addEventListener("change", function () {
        const selectedTumor = tumorDropdown.value;
        const selectedBlock = blockDropdown.value;
        const selectedConv = convDropdown.value;
        imageGallery.innerHTML = ""; // Clear previous images

        if (selectedTumor && selectedBlock && selectedConv && imageFiles[selectedTumor][selectedBlock][selectedConv]) {
            imageFiles[selectedTumor][selectedBlock][selectedConv].forEach(imageName => {
                let imgElement = document.createElement("img");
                imgElement.src = `saliency_Outputs_vgg16/${imageName}`; // Adjust folder path
                imgElement.alt = imageName;
                imageGallery.appendChild(imgElement);
            });
        }
    });
});
