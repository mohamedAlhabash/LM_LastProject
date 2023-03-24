<template>
    <!-- breadcrumb -->
    <div class="container py-4 flex items-center gap-3">
        <router-link to="/" class="text-primary text-base">
            <i class="fa-solid fa-house"></i>
        </router-link>
        <span class="text-sm text-gray-400">
            <i class="fa-solid fa-chevron-right"></i>
        </span>
        <router-link to="/" class="text-gray-600 font-medium">Profile</router-link>
    </div>
    <!-- ./breadcrumb -->

    <!-- wrapper -->
    <div class="container grid grid-cols-9 items-start gap-6 pt-4 pb-16">
        <!-- wishlist -->
        <div class="col-span-9 space-y-4">
            <div v-for="item in products" :key="item"
                class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                <div class="w-28">
                    <img :src="item[0].image" alt="product 6" class="w-full">
                </div>
                <div class="w-1/3">
                    <h2 class="text-gray-800 text-xl font-medium uppercase">
                        {{ item[0].name }}</h2>
                </div>
                <div class="text-primary text-lg font-semibold">${{ item[0].price }}</div>
                <div class="text-gray-600 cursor-pointer hover:text-primary">
                    <i @click="deleteItem(item[0].id)" class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>

        <!-- ./wishlist -->

    </div>
    <!-- ./wrapper -->
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
const user = useUserStore();
const products = ref({});
onMounted(() => {
    getProducts()
})
const getProducts = () => {
    axios.get('/products').then(res => {
        cartProduct(res.data)
    })
}

const cartProduct = (items) => {
    let elements = {};
    user.cart.forEach(element => {
        elements[element.id] = items.filter(el => {
            return el.id == element.porduct_id
        })
    });
    products.value = elements;

}
const deleteItem = (id) => {
    delete products.value[id]
    user.deleteFromCart(id);

}
</script>

<style scoped ></style>