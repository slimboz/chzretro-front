<template>
  <Container>
    <template #left-column
      ><Card color="blue" top>
        <div class="flex col fullwidth">
          <SideNavEntries section="games" />
        </div> </Card
      ><br />
      <Rules bot />
    </template>
    <Card header="mazo.gif" justified bg="mazo.gif">
      <div class="flex centered hstack">
        <router-link to="#gameplay" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.png"
          />&nbsp;Le gameplay</router-link
        >
        <router-link to="#best" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.png"
          />&nbsp;Les Meilleurs</router-link
        >
        <router-link to="#tutorial" class="btn-sm pink-bg">
          <img
            draggable="false"
            @contextmenu.prevent
            alt="Help icon"
            src="@/asset/img/icon/help.png"
          />&nbsp;Comment jouer&nbsp;?
        </router-link>
      </div>
      <br />
      <img
        draggable="false"
        @contextmenu.prevent
        src="@/asset/img/game/mazo/preview.gif"
        alt="Un coup gagnant"
        title="Un coup gagnant"
        style="float: left; margin-right: 16px"
      />
      <br />
      <b>MaZo</b> est un pur jeu de hasard/chance style roulette-russe !
      <br /><br />
      Le principe est simple: gagner le plus de fois possibles !<br />
      Contrairement à des jeux comme
      <router-link to="bacteria">Bacteria</router-link> ou
      <router-link to="patojdur">Patojdur</router-link> qui demandent des
      semaines d'entrainement pour devenir pro et atteindre le haut du
      classement, <b>MaZo</b> est un jeu ou tu peux devenir 1er du classement en
      quelques minutes... ou passer des premières places à dernier du classement
      en un seul coup !!! <b>>)</b> <br /><br />
      Qui s'arrêtera à temps ? Qui continuera une fois de trop ? @@ A toi de
      bien gérer, et... bonne chance ;)<br /><br />
      Les 3 premiers du classement gagnent un casque MaZo, les classés de la 4e
      à la 10e place gagnent un item trêfle.

      <br />
    </Card>
    <br />
    <Card id="tutorial" justified>
      <template #header>Comment jouer&nbsp;!</template>
      <template #subtitle
        >Attention : les visiteurs ne peuvent pas jouer !</template
      >
      MaZo ! se joue où tu veux, quand tu veux...<br />
      <br />
      Tout seul la nuit dans un coin sombre et reculé de la forêt bleue, tôt le
      matin dans l'eau à Kopakabana, après chaque 18/20 en Maths &lt;:D, à
      l'accueil à plusieurs encouragé par des dizaines de tiz en délire, de la
      main gauche, avec une cuillere de nutella dans la bouche...<br />
      <br />
      C'est comme tu le sens, n'oublie jamais: un coup de travers et tu perds
      !!! </Card
    ><br />
    <Card id="gameplay" justified>
      <template #header>Game Play</template>
      MaZo (toujours en version béta - version de test - pour le moment) se joue
      avec une commande de chat: tape !mazo pour jouer un coup, c'est tout !<br />
      <br />
      Tu as une chance sur deux de gagner.<br />
      Chaque fois que tu gagnes, ton score MaZo augmente d'un point.<br />
      Chaque fois que tu perds, ton score... reviens à zéro ! :')<br />
      <br />
      Alors ? Est ce que tu vas savoir t'arrêter à temps ? &lt;&lt;<br />
      <br />
      Notes:<br />
      - Tu as toujours une chance sur deux de gagner/perdre quelque soit le
      score, ce n'est pas plus difficile avec un gros score.<br />
      - Chaque coup est du pur hasard, il n'y a pas de moment meilleur, c'est
      quand tu le sens.<br />
      - Le temps que met à s'afficher le résultat n'indique pas un bon/mauvais
      coup.<br />
    </Card>
    <br /><Card id="best" v-if="data">
      <template #header>Les 20 plus mazo de l'Archipel</template>
      <template #subtitle>Continuera ? Continuera pas ? &lt;:D</template>
      <table class="score fullwidth">
        <colgroup>
          <col width="30" />
          <col width="100%" />
          <col width="40" />
          <col width="100%" />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Membre</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rank, index) in data.best" :key="index">
            <td>{{ index + 1 }}</td>
            <td><user :user="rank.user"/></td>
            <td
              ><b>{{ rank.score }}</b></td
            >
            <td>{{ formatDate(rank.date) }}</td>
          </tr>
        </tbody>
      </table>
    </Card>

    <template #right-column
      ><Card
        header="ensavoirplus.gif"
        :width="154"
        :height="34"
        top
        color="lightblue"
        justified
      >
        <img
          src="@/asset/img/icon/caret.gif"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
        />
        MaZo est actuellement en version beta (version de test)<br />
        <br />
        <img
          src="@/asset/img/icon/caret.gif"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
        />
        MaZo (beta) est accessible uniquement pour les membres de niveau 15 et
        plus.<br /><br />
        <img
          src="@/asset/img/icon/caret.gif"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
        />Le classement est mis à jour toutes les 10 minutes.<br /> </Card
    ></template>
  </Container>
</template>

<script>
import User from "@/component/link/User.vue";
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

export default {
  name: "Games",
  components: {
    User
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "Pp", {
        locale: window.__localeId__,
        addSuffix: true
      });
    }
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) =>
      vm.api.get("/api/mazo.json").then((res) => (vm.data = res.data))
    );
  },
  async beforeRouteUpdate() {
    const req = await this.api.get("/api/mazo.json");
    this.data = req.data;
  },
  metaInfo: {
    title: "section.mazo",
    meta: [
      {
        name: "description",
        content:
          "ChapatizRetro.com est un site pour s'amuser : tu peux tchater et te faire des amis, créer et faire évoluer ton personnage, jouer seul ou à plusieurs, fonder des groupes et même te marier !"
      },
      {
        property: "og:title",
        content: "Chapatiz Retro, accueil"
      },
      {
        property: "og:description",
        content: "Chapatiz Retro, accueil"
      },
      { property: "og:site_name", content: "Chapatiz Retro" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/announce/summer.png" },
      { property: "og:image:width", content: "192" },
      { property: "og:image:height", content: "192" }
    ]
  }
};
</script>

<style lang="scss" scoped>
.fullwidth.light {
  background: #eef5fa;
  padding: 2px 0;
}

tr td:first-child {
  font-weight: bold;
}

.hstack {
  justify-content: center;
}
</style>
