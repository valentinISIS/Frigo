<template>
    <main>
        <FrigoForm @AjoutItem="ajouteItem"></FrigoForm>
        <div>
            <h1>Le frigidaire</h1>
            <DataTable :value="data.listeItems" tableStyle="min-width: 50rem">
                <Column field="nom" header="Nom" style="width: 25%"></Column>
                <Column header="Image" style="width: 25%">
                    <template #body="{ data }">
                        <img :src="data.photo" alt="produit" style="max-width: 5rem;">
                    </template>
                </Column>
                <Column header="Quantité" style="width: 25%">
                    <template #body="{ data }">
                        <div style="display: flex; flex-direction: row; align-items: center;">
                            <div style="margin:10px">
                                <span> {{ data.qte }} </span>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: space-between;">
                                <Button @click="modifierItem(data.id, data.qte+1)" severity="secondary" icon="pi pi-angle-up" style="height: 0.75rem; width: 1.5rem;"></Button>
                                <Button @click="modifierItem(data.id, data.qte-1)" severity="secondary" icon="pi pi-angle-down" style="height: 0.75rem; width: 1.5rem;"></Button>
                            </div>
                        </div>
                    </template>        
                </Column>
                <Column header="Supprimer" style="width: 25%">
                    <template #body="{ data }">
                        <Button severity="danger" icon="pi pi-times" label="Supprimer" size="small" @click="supprimerItem(data.id)"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { doAjaxRequest } from "@/api";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FrigoForm from "./FrigoForm.vue";
import Button from "primevue/button";

let data = reactive({
    listeItems: []
});



function showError(error) {
    console.log("Erreur : status %d", error.status)
    console.log(error.body);
    alert(error.message);
}

function chargeItems() {
    doAjaxRequest("https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits")
        .then((json) => {
            data.listeItems = json;
        })
        .catch(showError);
}

function ajouteItem(){
    chargeItems()
}

function supprimerItem(id){
    const option = {
        method: "DELETE",
    }
    doAjaxRequest("https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits"+id, option)
        .then((json) => {chargeItems()})
        .catch(showError);
}

function modifierItem(id, qte){
    const option = {
        method: "PUT",
        headers: {
            'Content-Type' : "application/json"
        },
        body: {
            id: id,
            qte: qte
        }
    }
    doAjaxRequest("https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/4/produits", option)
        .then((json) => {chargeItems()})
        .catch(showError);
}

// A l'affichage du composant, on affiche la liste
onMounted(chargeItems);

</script>