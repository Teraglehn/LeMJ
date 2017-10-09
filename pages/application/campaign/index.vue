<template>
  <div>
    <div class="columns">
      <div class="column">
        <section class="hero is-dark is-bold">
          <div class="hero-body">
            <div class="container">
              <div class="level">
                <div class="level-left">
                  <h1 class="title">
                    Campagnes
                  </h1>
                </div>
                <div class="level-right">
                  <a href="campaign/search" class="button is-medium">
                    <span class="icon">
                      <i class="fa fa-search"></i>
                    </span>
                    <span>Chercher</span>
                  </a>
                  <a href="campaign/create" class="button is-medium">
                    <span class="icon">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span>Créer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="tabs">
            <ul>
              <li v-on:click="tab = 'mj'" :class="{'is-active': tab === 'mj'}"><a>Vos Campagnes</a></li>
              <li v-on:click="tab = 'invite'" :class="{'is-active': tab === 'invite'}"><a><span>Invitations</span> <span v-if="campaigns.invite.length > 0" class="icon tag is-dark is-rounded">{{ campaigns.invite.length }}</span></a></li>
              <li v-on:click="tab = 'running'" :class="{'is-active': tab === 'running'}"><a>En cours</a></li>
              <li v-on:click="tab = 'archive'" :class="{'is-active': tab === 'archive'}"><a>Archivées</a></li>
            </ul>
          </div>
          <div class="panel" v-for="campaign in campaigns[tab]" :key="campaign._id">
            <div class="panel-heading">
              <div class="level">
                <div class="level-left">
                  {{ campaign.name }}
                </div>
                <div class="level-right">
                  <div class="field has-addons">
                    <div class="control">
                      <a class="button is-primary">
                        <span class="icon">
                          <i class="fa fa-book"></i>
                        </span>
                        <span>Ouvrir</span>
                      </a>
                    </div>
                    <div class="control" v-if="isMj(campaign, user)">
                      <a class="button is-danger" v-on:click="deleteCampaign(campaign._id)">
                        <span class="icon">
                          <i class="fa fa-close"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DB from '~/plugins/DB'

  export default {
    middleware: 'auth',
    scrollToTop: true,
    head () {
      return {
        title: 'LeMJ - Campagnes'
      }
    },
    data: () => {
      return {
        campaigns: {},
        user: null,
        tab: 'mj'
      }
    },
    async asyncData ({ req, store }) {
      return {campaigns: await DB.getCampaigns(req), user: store.state.authUser}
    },
    methods: {
      deleteCampaign: async function (id) {
        await DB.deleteCampaign(id)
        this.campaigns = await DB.getCampaigns()
      },
      isMj: (campaign, user) => {
        let uid = user._id.toString()
        return uid === campaign.mj
      }
    }
  }
</script>

<style>
</style>
