<template>
  <div class="add-item">
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="add-item__form-group">
        <input
          required
          name="name"
          v-model='wine.name'
          type="text"
          class="add-item__input"
          placeholder="Name"
        />
      </div>
      <div class="add-item__form-group">
        <input
          required
          name="producer"
          v-model='wine.producer'
          type="text"
          class="add-item__input"
          placeholder="Producer"
        />
      </div>
      <div class="add-item__form-group">
        <input
          required
          name="grapes"
          v-model='wine.grapes'
          type="text"
          class="add-item__input"
          placeholder="Grapes"
        />
      </div>
      <div class="add-item__form-group add-item__form-group--column">
        <input
          required
          name="year"
          v-model='wine.year'
          type="number"
          minlength="4"
          maxlength="4"
          class="add-item__input"
          placeholder="Year"
        />
        <input
          required
          name="price"
          v-model='wine.price'
          type="number"
          step=".01"
          class="add-item__input"
          placeholder="Price"
        />
        <input
          required
          name="picture"
          type="file"
          class="add-item__input"
          ref="file"
          accept="image/*"
          @change="onSelect"
        />
      </div>
      <div class="add-item__form-group">
        <textarea
          required
          name="description"
          v-model='wine.description'
          class="add-item__input add-item__input--textarea"
          cols="30"
          rows="7"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="add-item__form-groupp">
        <input
          v-if="isSending"
          type="submit"
          value="Sendig..."
          class="add-item__button add-item__button--disabled"
          disabled
        />
        <input
          v-else
          type="submit"
          value="Add item"
          class="add-item__button"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      wine: {
        name: '',
        producer: '',
        year: '',
        grapes: '',
        price: '',
        picture: '',
        description: '',
      },
      file: '',
      isSending: false
    }
	},

  methods: {
		clearForm () {
			for (let field in this.wine) {
				this.wine[field] = ''
			}
		},

    onSelect () {
      const file = this.$refs.file.files[0]
      this.file = file
    },

		onSubmit (evt) {
			evt.preventDefault()
			this.isSending = true

			setTimeout(() => {
				let formData = this.wine;
        const wines = JSON.parse(localStorage.getItem('wineList'))
        formData.picture = this.file.name
        formData.id = wines.length + 1
        wines.push(formData)
        localStorage.setItem('wineList', JSON.stringify(wines))
        localStorage.setItem('wineListAux', JSON.stringify(wines))
        this.uploadFileToCloudinary(this.file)
			}, 1000)
		},

    uploadFileToCloudinary (file) {
      //Ideally these to lines would be in a .env file
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/vitorneves/upload'
      const CLOUDINARY_UPLOAD_PRESET = 'wineChallenge'

      let formData = new FormData()
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      formData.append('folder', 'wineChallenge')
      formData.append('file', file)

      return axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.clearForm()
        this.isSending = false
      })
      .catch(error => {
        console.warn(error);
      })
    }
	}
}
</script>

<style lang="scss" scoped>
.add-item {
  margin: 0 auto;
  width: 60%;

  &__form-group {
    margin: 0 auto $unit*5;

    &--column {
      display: flex;
      justify-content: space-between;

      & .add-item__input {
        width: 25%;
      }

      & .add-item__input:last-child {
        width: 46%;
      }
    }
  }

  &__input {
    height: $unit*9;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    color: $brand-gray;
    padding: $unit*2;
    border: 1px solid rgb(218, 218, 218);

    &:focus {
      outline: 0;
    }

    &--textarea {
      border-color: rgb(218, 218, 218);
      font-family: Avenir, Helvetica, Arial, sans-serif;
      height: 160px;
    }
  }

  &__button {
    background: $brand-black;
    color: $brand-white;
    border: none;
    padding: $unit*4;
    text-transform: uppercase;
    width: 100%;
  }
}
</style>
