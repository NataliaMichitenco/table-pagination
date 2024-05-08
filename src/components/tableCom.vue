<template>
  <div class="table center">
    <div class="table__input">
      <input class="table__input_text" type="text" v-model="keyword" @input="applyFilter" placeholder="Введите ключевое слово">
      <button class="search" @click="search">Поиск</button>
    </div>
    <table>
      <thead>
        <tr class="table__distance">
          <th>#</th>
          <th>Аватар</th>
          <th>ФИО</th>
          <th>Пол</th>
          <th>Страна</th>
          <th>Дата рождения</th>
          <th>Адрес почты</th>
          <th>Телефон</th>
        </tr>
      </thead>
      <tbody v-if="paginatedItems.length > 0">
        <tr v-for="(item, index) in paginatedItems" :key="item.gender + '-' + item.name.first + '-' + item.name.last">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td> <!-- Вычисляем номер строки -->
          <td><img class="avatar" :src="item.picture.thumbnail" alt="Аватар"></td>
          <td>{{ item.name.title }} {{ item.name.first }} {{ item.name.last }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.location.country }}</td>
          <td>{{ new Date(item.dob.date).toLocaleDateString() }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </tbody>
    </table>
      <button class="button" @click="prevPage">Предыдущая</button>
      <button class="btn" v-for="page in totalPages" :key="page" @click="goToPage(page)"
              :class="{ 'current-page': page === currentPage }">{{ page }}</button>
      <button class="button" @click="nextPage">Следующая</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { results: [] },
      currentPage: 1,
      itemsPerPage: 20,
      keyword: '',
    };
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredItems.slice(startIndex, endIndex);
    },
    filteredItems() {
      if (!this.keyword.trim()) {
        return this.data.results;
      }
      const keyword = this.keyword.trim().toLowerCase();
      return this.data.results.filter(item => {
        return Object.values(item).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(keyword);
          }
          return false;
        });
      });
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }
  },
  mounted() {
    fetch('api.json')
      .then(response => response.json())
      .then(data => {
        this.data = data; // Сохраняем данные в переменную data компонента
        console.log(this.data); // Вывод данных в консоль
        if (this.$route.query.q) {
          this.keyword = this.$route.query.q;
        }
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    applyFilter() {
      this.currentPage = 1; // Переход на первую страницу при изменении фильтра
    },
    search() {
      const queryParams = { q: this.keyword.trim() };
      this.$router.push({ path: this.$route.path, query: queryParams });
    }
  },
  watch: {
    '$route.query.q'(newVal) {
      if (newVal !== this.keyword) {
        this.keyword = newVal;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	text-decoration: none;
}

img {
	display: block;
	max-width: 100%;
}



.avatar {
  max-width: 60px;
  height: 60px;
  border-radius: 50%;
  padding-bottom: 10px;
}

.button {
  background: #5D7279;
  border: 1px solid #5D7279;
  color: aliceblue;
  width: 130px;
  height: 25px;
  margin-bottom: 20px;
}

.btn {
  background: #5D7279;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #5D7279;
  color: aliceblue;
}

.current-page {
  font-weight: bold; /* Пример стиля для выделения текущей страницы */
  background: #A6B6A9;
}

.table {
margin-left: 20px;

  &__input {
    padding-bottom: 20px;

    &_text {
      border: 1px solid #5D7279;
      width: 180px;
      height: 25px;
      text-align: center;
      background: #8A9F9B;
    }
  }
}

.search {
  border: 1px solid #5D7279;
  background: #5D7279;
  color: whitesmoke;
  width: 80px;
  height: 25px;
}
</style>
