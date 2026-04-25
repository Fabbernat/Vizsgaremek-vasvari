<script setup>
    import { useModalStore } from "@/stores/modal"
    const modal = useModalStore()
    import LoginForm from "./LoginForm.vue"

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.get('password')) {
            alert('Password hiányzik!')
            return;
        }


        const body = {
            username: formData.get('userName'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        const submitData = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('submitData', submitData)
        if (submitData?.status === 201 ) {
            const resp = await submitData.json();
            console.log('RESP', resp)
            const token = resp?.token;
            sessionStorage.setItem('token', token);
            modal.close()
        } else {
            alert('Valami hiba történt a regisztráció során!')
        }
    }
     const openLogin = () => {
        modal.open(LoginForm)
    }


</script>

<template>
    <form @submit.prevent="onSubmit">
        <input name="userName" class="m-3 rounded" placeholder="Felhasználónév" type="text"> <br>
        <input name="firstName" class="m-3 rounded" placeholder="Keresztnév" type="text"> <br>
        <input name="lastName" class="m-3 rounded" placeholder="Vezetéknév" type="text"> <br>
        <input name="email" class="m-3 rounded" placeholder="Email" type="text"> <br>
        <input name="password" class="m-3 rounded" placeholder="Jelszó" type="password"> <br>
        <input name="passwordAgain" class="m-3 rounded" placeholder="Jelszó újra" type="password">
        <button class="btn btn-primary" type="submit">Regisztráció</button>
        <button class="btn btn-primary" type="button" @click="openLogin()">Login</button>
    </form>
</template>