<script setup>
import { reactive, nextTick } from "vue"
import { useModalStore } from "@/stores/modal"
import { useNotificationStore } from "@/stores/notification"
import LoginForm from "./LoginForm.vue"

const modal = useModalStore()
const notify = useNotificationStore()

const form = reactive({
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordAgain: ""
})

const touched = reactive({
  userName: false,
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  passwordAgain: false
})

const onSubmit = async () => {

  Object.keys(touched).forEach(k => touched[k] = true)

  await nextTick()
  
  const isValid =
    form.userName &&
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.passwordAgain &&
    form.password === form.passwordAgain

  if (!isValid) {
    notify.notify("Kérlek tölts ki minden mezőt helyesen!", "error")
    return
  }

  const body = {
    username: form.userName,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password
  }

  try {
    const submitData = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    if (submitData?.status === 201) {
      const resp = await submitData.json()

      sessionStorage.setItem("token", resp.token)

      notify.notify("Sikeres regisztráció!", "success")

      modal.close()
    } else {
      const resp = await submitData.json()
      notify.notify(resp.message ?? "Hiba történt!", "error")
    }
  } catch (err) {
    notify.notify("Hálózati hiba!", "error")
  }
}

const openLogin = () => {
  modal.open(LoginForm)
}
</script>

<template>
  <form @submit.prevent="onSubmit">

    <input
      v-model="form.userName"
      @blur="touched.userName = true"
      :class="[
        'form-control mt-3 rounded',
        touched.userName && (form.userName ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Felhasználónév"
    />

    <input
      v-model="form.firstName"
      @blur="touched.firstName = true"
      :class="[
        'form-control mt-3 rounded',
        touched.firstName && (form.firstName ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Keresztnév"
    />

    <input
      v-model="form.lastName"
      @blur="touched.lastName = true"
      :class="[
        'form-control mt-3 rounded',
        touched.lastName && (form.lastName ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Vezetéknév"
    />

    <input
      v-model="form.email"
      @blur="touched.email = true"
      :class="[
        'form-control mt-3 rounded',
        touched.email && (form.email ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Email"
    />

    <input
      v-model="form.password"
      @blur="touched.password = true"
      :class="[
        'form-control mt-3 rounded',
        touched.password && (form.password ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Jelszó"
      type="password"
    />

    <input
      v-model="form.passwordAgain"
      @blur="touched.passwordAgain = true"
      :class="[
        'form-control mt-3 rounded',
        touched.passwordAgain && (form.passwordAgain ? 'is-valid' : 'is-invalid')
      ]"
      placeholder="Jelszó újra"
      type="password"
    />

    <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-primary" type="submit">
        Regisztráció
        </button>

        <button class="btn btn-outline-primary" type="button" @click="openLogin">
        Vissza a Login-ra
        </button>
    </div>


  </form>
</template>