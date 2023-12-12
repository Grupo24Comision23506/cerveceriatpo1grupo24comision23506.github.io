let sector = {
    template: `
    <section class="cuarto_sector" id="cervezeria" v-if= "value == 'CERVEZERIA' ">
    <div class="section_data">
        <div>
        <h1>Beers</h1>
        <input type='text' placeholder='ingrese a partir de que rating desea ver' v-model='rating'>
        <button @click="filterData(rating)">Filter Data</button>
        <button @click="fetchDataAxios">Data Axios</button>
        </div>
        <div v-if="error">
            Lo sentimos se produjo un error
            Error: {{nroerror}}
        </div>
        
        <div v-else-if="cargando==false"    class="container">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Brewery</th>
                    <th>Beer</th>
                    <th>Average</th>
                    <th>Reviews</th>
                    <th>Location</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody v-for="beer of beers">
                    <tr>
                    <td>{{beer.id}}</td>
                    <td>{{beer.Brewery}}</td>
                    <td>{{beer.beer}}</td>
                    <td>{{beer.rating.average}}</td>
                    <td>{{beer.rating.reviews}}</td>
                    <td>{{beer.location}}</td>
                    <td><img :src="beer.image" :alt="beer.beer"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else   class="spinner-border">
            <!-- spinner mientras se esta cargando-->
        </div> 

    </div>

</section>`,

    data: function () {
        return {
            url: "https://api.sampleapis.com/beers/ale",
            wines: [],
            error: false,
            nroerror: 0,
            cargando: true,
            rating: "",
        };
    },
    props: {
        value: String,
    },
    methods: {
        fetchData: function (url) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.beer = data;
                    this.cargando = false;
                })
                .catch((error) => {
                    console.log("error: " + error);
                    this.error = true;
                    this.nroerror = error;
                });
        },

        filterData: function (rating) {
            console.log(rating);
            this.beers = this.beers.filter((e) => e.rating.average > rating);
        },
        async fetchDataAxios() {
            let res = await axios(this.url);
            console.log(res.data);
        },
    },
    created() {
        this.fetchData(this.url);
    },
};

let app = {
    data: function () {
        return {
            lista: ["INICIO", "FORMULARIO", "MARKET"],
            value: null,
        };
    },
    methods: {
        clickedShow($event) {
            this.value = $event.target.innerHTML;
        },
    },

    components: {
        "sector-component": sector,
    },

    delimiters: ["--", "--"],
};

let appRoot = Vue.createApp(app).mount("#app");
