<script setup>
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
        console.log(submitData);
        const resp = await submitData.json();
        console.log(resp);
        console.log(resp.token);

        const token = resp?.token;
        sessionStorage.setItem('token', token);


    }

</script>
<template>
    <form @submit.prevent="onSubmit">
          <!-- <input class="m-3 rounded" placeholder="Felhasználónév" type="text"> <br> -->
          <input name="email" class="m-3 rounded" placeholder="Email cím" type="email"> <br>
          <input name="password" class="m-3 rounded" placeholder="Jelszó" type="password">
          <button class="btn btn-primary" type="submit">Bejelentkezés</button>
    </form>
</template>