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
                  <a href="campaign/create" class="button is-large is-medium">
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
          <div class="panel" v-for="campaign in campaigns">
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
                      <a class="button is-danger" v-on:click="deleteCampaign(campaigns)">
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
    async asyncData ({req, store}) {
      return {campaigns: await DB.getCampaigns(req), user: store.state.authUser}
    },
    methods: {
      deleteCampaign: async (campaign) => {
        // await campaign.delete()
        this.campaigns = await DB.getCampaigns()
      },
      isMj: (campaign, user) => {
        return user._id === campaign.mj
      }
    }
  }
</script>

<style>
</style>
