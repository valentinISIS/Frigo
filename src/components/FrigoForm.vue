<template>
    <main>
        <Card>
            <template #title>Ajouter un Item</template>
            <template #content >
                <div style="display: flex; justify-content: space-between; flex-direction: row; align-items: end;">
                    <div>
                        <label for="nom">Nom</label>
                        <input id="nom" v-model="nom" style="min-height: 2em; display: flex; align-items: center; justify-content: center;"/>
                        <label for="qte">Quantité</label>
                        <input id="qte" v-model="qte" style="min-height: 2em; display: flex; align-items: center; justify-content: center;"/>
                    </div>
                    <div>
                        <Button icon="pi pi-check" label="Ajouter" @click="ajouteItem" size="small"></Button>
                    </div>
                </div>
             </template>
        </Card>
        </main>
</template>

<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { ref } from 'vue';
import { doAjaxRequest } from "@/api";

const nom = ref(null);
const qte = ref(null);

const emit = defineEmits(["AjoutItem"]);

function showError(error) {
    console.log("Erreur : status %d", error.status)
    console.log(error.body);
    alert(error.message);
}

function ajouteItem(){
    const option = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: {
            nom: nom.value,
            qte: qte.value
        }
    }
    doAjaxRequest("https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits", option)
        .then((json) => {emit("AjoutItem")})
        .catch(showError);
}
</script>