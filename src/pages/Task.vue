<template>
    <h1>Практические задания</h1>
    <br>
    <hr>
    <br>
    <ul>
        <li>
            <h4>Создайте функционал для очистки value из input</h4>
            <div class="task">
                <my-input v-model="message"/>
                <my-button @click="cleaneMessage()">
                    Очистить сообщение
                </my-button>
            </div>
        </li>
        <li>
            <h4>Директива V-FOR</h4>
            <div class="task">
                <div v-for="actor in actors">{{ actor.name }}</div>
            </div>
        </li>
        <li>
            <h4>Директива V-BIND</h4>
            <div class="basket">
                &#128722;
                <span v-if="basketItem"> - {{ basketItem }}</span>
            </div>
            <div class="task product_container">
                <div class="cards_item" v-for="product in products" :id="product.id">
                    <div class="card">
                        <div class="card_image">{{ product.img }}</div>
                        <div class="card_content">
                            <h2 class="card_title">{{ product.title }}</h2>
                            <p class="card_text">US ${{ product.price }}</p>
                            <my-link :data-id="product.id" @click="addBasket()">Купить</my-link>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import MyLink from "@/components/UI/MyLink";

export default {
    components: {MyButton, MyInput, MyLink},
    data() {
        return {
            basketItem: 0,
            message: 'Hello, WaterMelon',
            actors: [
                {name: 'Morgan Freeman'},
                {name: 'Leonardo DiCaprio'},
                {name: 'Brad Pitt'},
                {name: 'Michael Caine'},
                {name: 'Robert De Niro'}
            ],
            products: [
                {
                    id: '1a',
                    title: 'iPhone XR',
                    price: 899,
                    img: '⛄'
                },
                {
                    id: '2b',
                    title: 'iPhone XS MAX',
                    price: 1099,
                    img: '☠'
                },
                {
                    id: '3c',
                    title: 'iPhone X',
                    price: 1000,
                    img: '⚓'
                },
            ],
        }
    },
    methods: {
        cleaneMessage() {
            this.message = ''
        },
        addBasket() {
            this.basketItem += 1
            console.log(this.$attrs)
        }
    }
}
</script>

<style scoped>
.task {
    margin-top: 10px;
}

ul {
    padding-left: 15px;
}

li:not(:first-child) {
    margin-top: 10px;
}

.product_container {
    display: flex;
    width: 500px;
    justify-content: space-between;
}

.card {
    text-align: center;
}

.card_image {
    font-size: 60px;
}

.card_content {
    margin-top: 20px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.basket {
    font-size: 35px;
}
</style>