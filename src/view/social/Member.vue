<template>
  <Container>
    <template #left-column>
      <Card color="blue" top>
        <div class="flex col fullwidth">
          <SideNavEntries section="members" />
        </div>
      </Card>
      <br />
      <Rules bot />
    </template>
    <span class="pink justified">
      <router-link to="/bbs" class="pink"
        >» Retour à l'annuaire</router-link
      > </span
    ><br />
    <Card class="member" :class="[this.data.gender]" v-if="data" justified>
      <div class="member-header">
        <Tiz
          :avatar="data.look.avatar"
          :emote="data.look.emote"
          :hat="data.look.hat"
          :body="data.look.body"
          :shoe="data.look.shoe"
          :item0="data.look.item0"
          :item1="data.look.item1"
          :item2="data.look.item2"
        />
        <div class="flex col" style="z-index: 1; position: relative">
          <StrokeText class="pseudo">{{ this.data.name }}</StrokeText>
          <div class="motto">"{{ this.data.motto }}"</div>
        </div>
      </div>
      <div class="member-body">
        <div class="member-portrait centered">
          <div class="portrait flex">
            <Tiz
              :avatar="data.look.avatar"
              :emote="data.look.emote"
              :hat="data.look.hat"
              :body="data.look.body"
              :shoe="data.look.shoe"
              :item0="data.look.item0"
              :item1="data.look.item1"
              :item2="data.look.item2"
            />
          </div>
          <div v-if="!this.data.status.connected">
            Dernière visite le <b>{{ formatDate }}</b>
          </div>
          <div v-else>
            <div
              class="online flex centered"
              :class="{ tchat: this.data.status.room }"
            >
              <img
                draggable="false"
                @contextmenu.prevent
                src="@/asset/img/tiz/tiz_shape.svg"
              />&nbsp;<b>En ligne</b>
            </div>
            <b>{{ this.data.status.room }}</b>
          </div>
        </div>
        <div class="member-text">
          <p>
            Marié avec
            <User :user="{ id: '2', name: 'Tigriz', color: '#f0f' }" /> depuis
            76 jours
          </p>
          <p>
            Intérêts :
            <b v-for="(interest, index) of this.data.centres" :key="index"
              >{{ interest
              }}<span v-if="index < this.data.centres.length - 1">, </span></b
            >
          </p>
          <p>
            Page perso :
            <a target="_blank" :href="this.data.website">{{
              this.data.website
            }}</a>
          </p>
          <p>
            Inscrit aux groupes :
            <Group
              v-for="(group, index) of this.data.groups"
              :group="group"
              :key="group.id"
              :separator="index < this.data.groups.length - 1"
            />
          </p>
          <br />
          <div class="icon flex centered">
            Chapato
            <img
              draggable="false"
              @contextmenu.prevent
              src="@/asset/img/icon/gender/male.svg"
            />
          </div>
          &nbsp;
          <div class="icon flex centered">
            Niveau<br /><img
              draggable="false"
              @contextmenu.prevent
              width="19"
              height="21"
              src="@/asset/img/number/2.svg"
            /><img
              draggable="false"
              @contextmenu.prevent
              width="19"
              height="21"
              src="@/asset/img/number/5.svg"
            />
          </div>
          <br /><br />
          <p>
            Vérification du nom :
            <b
              >{{ this.data.name.toLowerCase() }},
              {{ this.data.name.toUpperCase() }}</b
            >
          </p>
          <p>
            Signe astrologik : <b>{{ this.data.astro }}</b>
          </p>
        </div>
      </div>
      <br />
      <div class="member-section">
        <img
          draggable="false"
          @contextmenu.prevent
          src="@/asset/img/member/bacteria_mec.gif"
          style="float:left"
        />
        Classement : 25ème<br />19 parties, 10 gagnées, 9 perdues, 0 nulles 40
        points
      </div>
      <br />
      <div class="member-section">
        <img
          draggable="false"
          @contextmenu.prevent
          src="@/asset/img/member/patojdur_mec.gif"
          style="float:left"
        />
        Classement : 25ème<br />19 parties, 10 gagnées, 9 perdues, 0 nulles 40
        points </div
      ><br />
      <div class="member-section registration">
        Membre n°3<br />
        Dans la communauté depuis le 16 Mars 2021 à 14h16 (218 jours)
      </div>
      <br />
      Messages sur le forum : 92
    </Card>
    <template #right-column
      ><Card color="blue" top>
        <template #header> Records ! </template>
        <template #subtitle
          >Dans le bon ou le mauvais, ce sont les meilleurs !</template
        >
        parties jouées:
        <br />
        fredazur avec 22665 parties jouées ! <br />
        <br />
        parties gagnées: <br />
        AleXxX_DeViLMaN avec 15171 parties gagnées ! <br />
        <br />
        parties perdues: <br />
        fredazur avec 20763 parties perdues ! <br />
        <br />
        match nuls: <br />
        20CeNt avec 1077 match nuls ! <br /> </Card
    ></template>
  </Container>
</template>

<script>
import Tiz from "@/component/Tiz.vue";
import User from "@/component/link/User.vue";
import Group from "@/component/link/Group.vue";
import StrokeText from "@/component/StrokeText.vue";
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

export default {
  name: "Member",
  components: {
    Tiz,
    User,
    Group,
    StrokeText
  },
  data() {
    return {
      data: null
    };
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) =>
      vm.api.get("/api/member.json").then((res) => (vm.data = res.data))
    );
  },
  async beforeRouteUpdate() {
    const req = await this.api.get("/api/member.json");
    this.data = req.data;
  },
  computed: {
    formatDate() {
      return format(new Date(this.data.status.date), "Pp", {
        locale: window.__localeId__,
        addSuffix: true
      });
    }
  },
  metaInfo: {
    title: "section.member",
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
<style lang="scss">
.card {
  background-size: contain;
  background-repeat: repeat-x;
}
.male .card {
  background-image: url(../../asset/img/member/header_mec.gif);
}

.female .card {
  background-image: url(../../asset/img/member/header_fille.gif);
}
</style>
<style lang="scss" scoped>
.member {
  overflow: hidden;
}

.motto {
  margin-left: 33%;
  text-align: left;
}

.member-body {
  background: #eff5fa;
  clear: both;
}

.member-header {
  font-family: "Chimboz Heavy";
  color: #fff;
  font-size: 20px;
  text-shadow: 2px 1px #0008;
  min-height: 90px;
}

.member-header .tiz {
  float: left;
  margin: 40px auto -100% 12%;
  transform: rotate(-5deg) scale(3);
}

.pseudo {
  margin-left: 33%;
  width: 67%;
  font-size: 35px;
  fill: #fff;
  stroke: #f39;
  stroke-width: 3;
  text-shadow: -1px 3px #f39;
  height: 35px;
  overflow: visible;
}

.portrait {
  justify-content: center;
  align-items: center;
  background: url(../../asset/img/member/portrait.png);
  height: 112px;
  width: 104px;
  margin-bottom: 6px;
  overflow: hidden;
}

.member-section,
.member-body {
  z-index: 1;
  position: relative;
  border-radius: 8px;
}

.member-section,
.member-text {
  padding: 6px;
}

.member-portrait {
  float: right;
  background: #fff;
  border-radius: 8px;
  padding: 6px;
}

.member-section {
  background: #a9cbe4;
  display: flex;
  align-items: center;
}

.icon {
  display: inline-flex;
  font-family: "Pixelated Verdana 10";
  font-size: 10px;
  flex-wrap: wrap;
  justify-content: center;
  width: 50px;
  height: 50px;
  line-height: 10px;
  border: 1px solid #6090be;
  background: linear-gradient(to bottom, #deeaf5, #a7c6e4);
  border-radius: 4px;
}

.online {
  font-family: "Pixelated Verdana 10";
  font-size: 10px;
  color: #fff;
  justify-content: center;
  width: 100%;
  height: 26px;
  background: linear-gradient(to bottom, #0193ca, #2d4a97);
  border-radius: 10px;
}

.online.tchat {
  background: linear-gradient(to bottom, #81cb00, #40972d);
}

.online img {
  height: 20px;
}

.registration {
  padding: 12px;
}
</style>
