import { Text, View } from "react-native";

function register(data: FormData) {
    console.log(data);

     // Itt lehetne elküldeni a regisztrációs adatokat a Supabase szervernek, például fetch API-val
     fetch('/api/register', {
       method: 'POST',
       body: data,
     }).then(response => {
       if (response.ok) {
         // Sikeres regisztráció
       } else {
         // Hiba történt
       }
     });
}

export default function Register() {
  return (
    <View>
      <form action={register} method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="confirm_password" placeholder="Confirm password" required />
        <button type="submit">Register</button>
      </form>
    </View>
  );
}