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
        <input type="file" v-bind:class="{ small: !!src }" v-on:change="onFileSelection" />
        <div id="img-wrapper" v-if="src">
          <!-- Helper to verticaly align image -->
          <span></span>
          <img v-bind:src="src" />
        </div>
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
import bus from '@/bus';

import M2LTitle from '@/components/M2LTitle';
import M2LButton from '@/components/M2LButton';

export default {
  name: 'room-form',
  props: {
    onAddClick: {}, 
    onCancelClick: {}, 
    mode: {},
    room: { default: () => { return { image: '' }; } }
  },
  created: function() {
    this.title = this.mode === 'new' ? 'Ajouter une salle' : `Modifier la salle ${this.room.name}`;

    bus.$on('roomImageSetted', (image) => {
      this.src = 'data:image/jpeg; base64,' + image.data;
    })
  },
  data () {
    return {
      title: '',
      confirmButtonLabel: this.mode === 'new' ? 'Ajouter la salle' : 'Modifier la salle',
      src: ''
    }
  },
  components: {
    M2LButton,
    M2LTitle,
  },
  methods: {
    onFileSelection: function(event) {
      // http://codepen.io/Atinux/pen/qOvawK/
      const files = event.target.files || event.dataTransfer.files;
      const img = files[0];
      this.room.image = { ext: img.type.split('/')[1] };

      const reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target.result;
        this.room.image.data = this.src.replace('data:image/' + this.room.image.ext + ';base64,', '');
      };
      reader.readAsDataURL(img);
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
  .small {
    width: 150px;
  }
  
  label {
    display: inline-block;
    width: 250px;
    text-align: left;
  }

  input, textarea {
    width: 250px;
    max-width: 250px;
    vertical-align: top;
  }

  form {
    margin-top: 10px;
  }

  input[type=file] {
    vertical-align: middle;
  }

  form div {
    padding: 6px;
  }

  #img-wrapper {
    width: 100px;
    max-height: 100px;
    margin: 0;
    margin-bottom: 6px;
    padding: 0;
    white-space: nowrap;
    display: inline-block;
  }

  #img-wrapper span {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  img {
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
</style>