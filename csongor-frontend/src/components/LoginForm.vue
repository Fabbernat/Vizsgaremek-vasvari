<script setup>
    import { useModalStore } from "@/stores/modal"
    import RegisterForm from "./RegisterForm.vue"
    const modal = useModalStore()

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.get('email')) {
            alert('Email hiányzik!')
            return;
        }
        if (!formData.get('password')) {
            alert('Password hiányzik!')
            return;
        }


        const body = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        const submitData = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const resp = await submitData.json();

        const token = resp?.token;
        sessionStorage.setItem('token', token);
        modal.close()

    }

    const openRegistration = () => {
        modal.open(RegisterForm)
    }
    

</script>
<template>
    <form @submit.prevent="onSubmit">
          <!-- <input class="m-3 rounded" placeholder="Felhasználónév" type="text"> <br> -->
          <input name="email" class="m-3 rounded" placeholder="Email cím" type="email"> <br>
          <input name="password" class="m-3 rounded" placeholder="Jelszó" type="password">
          <button class="btn btn-primary" type="submit">Bejelentkezés</button>
          <button class="btn btn-primary" type="button" @click="openRegistration()">Regisztráció</button>
    </form>
</template>