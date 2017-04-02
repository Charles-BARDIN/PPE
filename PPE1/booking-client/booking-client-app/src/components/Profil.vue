<template>
<div class="profil">
          <h1>Modifier mon profil</h1>
          <form action="">
            <label for="lastname" class="labelo">Nom </label>: 
            <span class="spaceprofile"></span> <br>
            <label for="numberstreet" class="labelo">N°</label>:<input type="number" min="0" name="numberstreet" class="space"/><br>
            <label for="labelStreet" class="labelo">Voie </label> :
                <select name="labelStreet" id="labelStreet" class="spaceSelect">
                    <option value="blanck" selected> </option>
                    <option value="rue">Rue</option>
                    <option value="ruelle">Ruelle</option>
                    <option value="allee">Allée</option>
                    <option value="impasse">Impasse</option>
                    <option value="route">Route</option>
                    <option value="rue">Avenue</option>
                 </select> <br>
            <label for="adress" class="labelo">Adresse</label> : <input type="text" name="adress" class="space"/><br>                   
            <label for="city" class="labelo">Ville</label>:<input type="text" name="city" class="space"/> <br/>
            <label for="country" class="labelo">Pays </label> :
                <select name="country" id="country" class="spaceSelect">
                    <option value="france" selected>France</option>
                    <option value="allemagne">Allemagne</option>
                    <option value="luxembourg">Luxembourg</option>
                    <option value="belgique">Belgique</option>
                    <option value="suisse">Suisse</option>
                </select><br>
            <label for="mail" class="labelo">Adresse mail</label>:<input type="email" name="email" class="space"/> <br/>
            <label for="name" class="labelo">Téléphone</label>:<input type="text" name="name" class="space"/> <br>
            <label for="name" class="labelo">Ancien mot de passe</label>:<input type="password" name="name" class="space"/> <br> 
            <label for="name" class="labelo">Nouveau Mot De Passe</label>:<input type="password" name="name" class="space"/> <br>
            <label for="name" class="labelo">Retapez le Mot De Passe</label>:<input type="password" name="name" class="space"/>  <br>                 
          </form>
          <input type="submit" value="S'inscrire"/>
      </div>
    </div>
    
</template>

<script>
export default {
  name: 'profil'
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
