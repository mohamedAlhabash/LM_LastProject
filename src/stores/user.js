import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
window.toastr = toastr;
export const useUserStore = defineStore('user', () => {
    const user = ref(0);
    const cart = ref(0);
    const lang = ref("");
    function setUser(item) {
        user.value = item
    }
    function setCart(item) {
        cart.value = item
    }
    function addToCart(id) {
        axios.post('/add-to-cart', {
            porduct_id: id,
            user_id: user.value.id
        }).then(
            toastr.success("product addedd Successfully to cart")
        ).then(
            getCart()
        )
    }
    function getCart() {
        axios.get('/add-to-cart', {
            params: {
                user_id: user.value.id
            }
        }).then(res => {
            cart.value = res.data
        })
    }
    function deleteFromCart(id) {
        axios.delete('/add-to-cart/' + id).then(
            toastr.success("product deleted successfully")

        ).then(
            getCart()
        )
    }

    return { user, setUser, addToCart, cart, deleteFromCart, setCart, lang }
})
//  deleteFromCart,addToCart,setCart,