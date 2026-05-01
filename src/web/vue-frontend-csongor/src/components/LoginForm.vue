<script setup>
import { reactive, nextTick } from "vue"
import { useModalStore } from "@/stores/modal"
import { useNotificationStore } from "@/stores/notification"
import RegisterForm from "./RegisterForm.vue"

const modal = useModalStore()
const notify = useNotificationStore()

const form = reactive({
  email: "",
  password: ""
})

const touched = reactive({
  email: false,
  password: false
})

const onSubmit = async () => {
  // minden mező touched lesz
  Object.keys(touched).forEach(k => touched[k] = true)

  await nextTick()

  // validáció
  const isValid =
    form.email &&
    form.password

  if (!isValid) {
    notify.notify("Tölts ki minden mezőt!", "error")
    return
  }

  const body = {
    email: form.email,
    password: form.password
  }

  try {
    const submitData = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    if (submitData?.status === 200) {
      const resp = await submitData.json()

      sessionStorage.setItem("token", resp.token)
      sessionStorage.setItem("username", resp.username)
      sessionStorage.setItem("user_id", resp.user_id)

      window.dispatchEvent(new Event("login-success"))

      notify.notify("Sikeres bejelentkezés!", "success")

      modal.close()
    } else {
      const resp = await submitData.json()
      notify.notify(resp.message ?? "Hiba történt!", "error")
    }
  } catch (err) {
    notify.notify("Hálózati hiba!", "error")
  }
}

const openRegistration = () => {
  modal.open(RegisterForm)
}
</script>

<template>
  <form @submit.prevent="onSubmit">

    <input
      v-model="form.email"
      @blur="touched.email = true"
      type="email"
      placeholder="Email cím"
      :class="[
        'form-control mt-3',
        touched.email && (form.email ? 'is-valid' : 'is-invalid')
      ]"
    />

    <input
      v-model="form.password"
      @blur="touched.password = true"
      type="password"
      placeholder="Jelszó"
      :class="[
        'form-control mt-3',
        touched.password && (form.password ? 'is-valid' : 'is-invalid')
      ]"
    />

    <div class="d-flex justify-content-end gap-2 mt-3">
      <button class="btn btn-primary" type="submit">
        Bejelentkezés
      </button>

      <button
        class="btn  btn-outline-primary"
        type="button"
        @click="openRegistration"
      >
        Regisztráció
      </button>
    </div>

  </form>
</template>