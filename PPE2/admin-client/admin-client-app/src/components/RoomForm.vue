<template>
  <div>
    <M2LTitle>{{ title }}</M2LTitle>
    <form>
      <div>
        <label>Nom</label>
        <input type="text" v-model="room.name" />
      </div>

      <div>
        <label>Image</label>
        <input type="file" v-on:change="onFileSelection" />
      </div>
      
      <div>
        <label>Description</label>
        <textarea v-model="room.description"></textarea>
      </div>

      <M2LButton label="Annuler" v-bind:action="oncancelclick" />
      <M2LButton v-bind:label="confirmButtonLabel" v-bind:action="onaddclick" />
    </form>
  </div>
</template>

<script>
import M2LTitle from '@/components/M2LTitle';
import M2LButton from '@/components/M2LButton';

export default {
  name: 'room-form',
  props: ['on-add-click', 'on-cancel-click', 'mode'],
  data () {
    return {
      title: this.mode === 'new' ? 'Ajouter une salle' : `Modifier la salle ${this.room.name}`,
      confirmButtonLabel: this.mode === 'new' ? 'Ajouter la salle' : 'Modifier la salle',
      room: {}
    }
  },
  components: {
    M2LButton,
    M2LTitle,
  },
  methods: {
    onFileSelection: function(event) {
      const files = event.target.files || event.dataTransfer.files;
      this.room.image = files[0];
    },
    oncancelclick: function() {
      this.onCancelClick();
    },
    onaddclick: function() {
      this.onAddClick(this.room);
    }
  }
}
</script>

<style scoped>
  label {
    display: inline-block;
    width: 250px;
    text-align: left;
  }

  input, textarea {
    width: 250px;
    max-width: 250px;
  }

  form {
    margin-top: 10px;
  }

  form div {
    padding: 6px;
  }
</style>