<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Monitoreo de claves</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-grid>
        <ion-row>
          <ion-col>
            <div>Clave</div>
          </ion-col>
          <ion-col>
            <div>Status</div>
          </ion-col>
          <ion-col>
            <div>Usuario</div>
          </ion-col>
        </ion-row>

        <ion-row v-for="(item, index) in listaClaves" :key="index">
          <ion-col>
            <div>{{listaKeys[index]}}</div>
          </ion-col>
          <ion-col>
            <div>{{item.status}}</div>
          </ion-col>
          <ion-col>
            <div>{{item.usuario}}</div>
          </ion-col>  
        </ion-row>

      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { getDatabase, ref, onValue } from "firebase/database";
export default {
  name: "Tab1",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow },
  data() {
    return {

      listaClaves: [{ status: "", usuario: "" }],
      listaKeys: []

    };
  },

  mounted() {
    const db = getDatabase();
    const starCountRef = ref(db, "claves/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      var cont = 0
      snapshot.forEach(element => { 
        this.listaKeys[cont] = element.key
        this.listaClaves[cont] = element.toJSON()
        cont++
        console.log(element);
      });
    });
    console.log("lista de claves", this.listaClaves)
  },

};
</script>
<style>
ion-col>div {
  background-color: #f7f7f7;
  border: solid 1px #ddd;
  padding: 10px;
}
</style>
