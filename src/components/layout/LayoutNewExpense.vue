<template>
  <div class="c-add-expense">
    <button
      class="btn btn-md btn-outline-primary w-75"
      @click="showModal = true"
    >
      <i class="fa fa-plus"></i> Nova Despesa
    </button>

    <form @submit.prevent="submit">
      <div
        class="modal fade"
        :class="{ show: showModal }"
        :style="{ display: showModal ? 'block' : 'none' }"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Inclusão de Despesa</h5>
              <button type="button" class="close" @click="closeModal">
                <span>×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label>Descrição:</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.description"
                    required
                  />
                </div>
                <div class="form-group col-4">
                  <label>Valor (R$):</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.value"
                    required
                  />
                </div>
                <div
                  class="form-group col-12 d-flex align-items-center file-input"
                >
                  <input
                    ref="input"
                    type="file"
                    class="d-none"
                    accept="image/*"
                    @change="handleFile($event)"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary w-50"
                    @click="openFileDialog"
                  >
                    Adicionar recibo
                  </button>
                </div>
                <div v-if="form.receipt" class="mt-2 col-12">
                  <div class="receipt-file">
                    <span
                      class="badge badge-dark close-icon"
                      @click="form.receipt = ''"
                      >X
                    </span>
                    <span class="badge badge-dark">
                      {{ form.receipt.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Fechar
              </button>
              <button class="btn btn-primary">Incluir nova despesa</button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade"
        :style="{ display: showModal ? 'block' : 'none' }"
        :class="{ show: showModal }"
      ></div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "NewExpense",
  data() {
    return {
      showModal: false,
      form: {
        receipt: "",
        description: "",
        value: "",
      },
    };
  },
  computed: {
    // metodo para gerar nomes diferentes de arquivos
    fileName() {
      const { receipt } = this.form;

      if (receipt) {
        const split = receipt.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    openFileDialog() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleFile({ target }) {
      this.form.receipt = target.files[0];
    },
    async submit() {
      let url = "";

      try {
        this.$root.$emit("spinnerShow");
        // - id_usuario     -----------  id_user
        //  - id_gasto      -----------  id_expense
        //   - createAt     -----------  createdAt
        //   - description  -----------  description
        //   - id           -----------  id
        //   - receipt      -----------  receipt
        //   - value        -----------  value

        // busca na arvore por uma referencia, no caso aqui pelo id do user
        // caso nao ache ele ira criar um novo
        const ref = this.$firebase.database().ref(window.uid);

        // gera um hash unico para a 'despesa', transacoes no banco
        const id = ref.push().key;

        // UPLOAD DO ARQUIVO
        if (this.form.receipt) {
          const snapshot = await this.$firebase
            .storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt);

          url = await snapshot.ref.getDownloadURL();
        }

        const payload = {
          id,
          ...this.form,
          receipt: url, // FOI COLOCADO NOVAMENTE PARA SOBREESCREVER PARA NÃO DAR ERRO NO BANCO
          createdAt: new Date().getTime(), // cria um timestamp da hora atual de inclusao
        };

        // para incluir a transacao o set() cria uma nova entrada no banco e retorna um callback de erro 'err'
        ref.child(id).set(payload, (err) => {
          if (err) {
            console.error(err);
          } else {
            this.closeModal();
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.$root.$emit("spinnerHide");
      }
    },

    closeModal() {
      this.showModal = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.c-add-expense {
  width: 100%;
  display: flex;
  justify-content: center;
  .modal {
    color: var(--darker);
  }
  .file-input {
    justify-content: center;
  }

  .receipt-file {
    .close-icon {
      &:hover {
        cursor: pointer;
        background-color: rgb(95, 91, 91);
      }
    }
  }
}
</style>
