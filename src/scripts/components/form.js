export class Form {
    constructor() {

        this.list = [
            {
                src: "svgs/paodeacucar.svg",
                title: "Pão de Açúcar",
                description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                src: "svgs/cristoredentor.svg",
                title: "Cristo Redentor",
                description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                src: "svgs/ilhagrande.svg",
                title: "Ilha Grande",
                description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                src: "svgs/centrohistoricodeparati.svg",
                title: "Centro Histórico de Parati",
                description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
        ];
        this.selectors();
        this.events();
        this.renderListItems();
        if (window.innerWidth > 1024){
            this.addSlick();
        }
    }

    selectors() {
        this.inputImage = document.querySelector("#inputImage");
        this.imagePreview = document.getElementsByClassName("image");
        this.form = document.querySelector(".form");
        this.itemTitle = document.querySelector("#titleInput");
        this.itemDescription = document.querySelector("#descriptionText");
        this.slider = document.querySelector(".slider-list");
    }

    events() {
        this.inputImage.addEventListener("change", this.addImage.bind(this), false);
        this.form.addEventListener("submit", this.addItemToList.bind(this));
    }

    addImage(event){
        const inputFile = event.target;
        const file = inputFile.files[0];
        if (file){
            const reader = new FileReader();
            reader.addEventListener("load", (imagem) => {
                const readerTarget = imagem.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("image");
                this.imagePreview[0].innerHTML = "";
                this.imagePreview[0].appendChild(img);
            });
            reader.readAsDataURL(file);
        } else{
            this.imagePreview[0].innerHTML;
        }
    }

    addItemToList(event) {
        event.preventDefault();
        const itemImage = this.imagePreview[0].children[0].src;
        const itemTitle = event.target["titleInput"].value;
        const itemDescription = event.target["descriptionText"].value;

        if (itemTitle !== "" && itemDescription !== "" && itemImage !== "") {
            const item = {
            src: itemImage,
            title: itemTitle,
            description: itemDescription,
         };

        this.list.push(item);

        this.renderListItems();
        if (window.innerWidth > 1024){
            this.removeSlick();
        }
        if (window.innerWidth > 1024){
            this.addSlick();
        }
        this.resetInputs();
        }

    }

    renderListItems() {
        let itemsSlider = "";

        this.list.forEach(function (item) {
            itemsSlider += `
                <li class="slider-content" data-test="item-list">
                    <figure>
                        <img src="${item.src}" alt="${item.title}" data-test="image-item-list"/>
                        <h3 data-test="title-item-list">${item.title}</h3>
                        <figcaption data-test="description-item-list">
                            ${item.description}
                        </figcaption>
                    </figure>
                </li>
            `;
        });
        this.slider.innerHTML = itemsSlider;
    }

    addSlick () {
        $(".slider-list").slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: true,
        });
    }

    removeSlick () {
        $(".slider-list").slick('unslick');
    }

    resetInputs() {
        this.imagePreview[0].innerHTML = "";
        this.itemTitle.value = "";
        this.itemDescription.value = "";
    }
}
