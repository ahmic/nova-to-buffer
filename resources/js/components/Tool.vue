<template>
    <div>
        <div class="flex items-center mb-3">
            <heading class="text-90 font-normal text-2xl flex-no-shrink"><icon-buffer></icon-buffer> Post to Buffer</heading>

            <div class="ml-3 w-full flex items-center justify-end">
                <dropdown dusk="select-all-dropdown">
                    <dropdown-trigger slot-scope="{ toggle }" :show-arrow="false" :handleClick="toggle" class="mr-3">
                        <button class="btn btn-default btn-icon btn-white text-80 font-normal no-text-shadow">
                            <span v-if="profileIds.length == 0" class="inline-block rounded-full w-2 h-2 mr-2 bg-danger"></span>
                            <span v-else class="inline-block rounded-full w-2 h-2 mr-2 bg-success"></span>
                            Profiles ({{ profileIds.length }})
                            <icon-down />
                        </button>
                    </dropdown-trigger>

                    <dropdown-menu slot="menu" direction="ltr" width="250">
                        <div class="px-3 py-2 text-center">
                            <div v-if="profileIds.length == 0" class="warning">
                                No profile ids found! Edit config
                            </div>
                            <div v-else class="">
                                <p v-for="profileId in profileIds" class="py-1 text-xs">{{ profileId }}</p>
                            </div>
                        </div>
                    </dropdown-menu>
                </dropdown>

                <a href="https://publish.buffer.com" target="_blank" class="btn btn-default btn-icon btn-white text-80 font-normal no-text-shadow">Buffer dashboard <icon-external></icon-external></a>
            </div>
        </div>


        <card v-if="response == null">
            <div class="px-3 py-3">

                <div class="flex mb-3">

                    <div class="w-1/4">
                        <label for="publishnow" class="inline-block text-80 leading-tight">
                            URL to be shared
                        </label>
                    </div>

                    <div class="w-3/4">
                        <input type="text" disabled class="form-control form-input form-input-bordered w-full" :value="url">
                    </div>

                </div>

                <div class="flex">

                    <div class="w-1/4">
                        <label for="publishnow" class="inline-block text-80 leading-tight">
                            Post description
                        </label>
                    </div>

                    <div class="w-3/4">
                        <textarea class="post-status w-full form-control form-input form-input-bordered py-3 h-auto" name="description" rows="2" v-model="description"></textarea>
                    </div>

                </div>

                <div class="flex mt-3">
                    <div class="w-1/4 pr-3">
                        <label for="publishnow" class="inline-block text-80 leading-tight">
                            Publish now
                        </label>
                    </div>

                    <div class="w-3/4 flex flex-inline align-center">
                        <checkbox
                            class="inline-flex"
                            @input="toggle"
                            :id="publishnow"
                            :name="'pusblishnow'"
                            :checked="publishnow"
                            :disabled="false"
                        />
                        <help-text class="inline-flex ml-2">Check only if you want to publish immediately. Otherwise post will go to default queue.</help-text>
                    </div>
                </div>

                <div class="flex">
                    <div class="ml-auto">
                        <progress-button :processing="processing" :disabled="processing" @click.native="publish">Send update</progress-button>
                    </div>
                </div>

            </div>
        </card>

        <card v-if="response != null">
            <div class="px-3 py-3 flex">
                <div class="w-full">
                    <div class="flex border-b border-40">
                        <div class="w-1/4 py-4"><h4 class="font-normal text-80">Message</h4></div>
                        <div class="w-3/4 py-4"><p class="text-90">{{ response.message }}</p></div>
                    </div>

                    <div class="flex border-b border-40">
                        <div class="w-1/4 py-4"><h4 class="font-normal text-80">Buffer count</h4></div>
                        <div class="w-3/4 py-4"><p class="text-90">{{ response.buffer_count }}</p></div>
                    </div>

                    <div class="flex">
                        <div class="w-1/4 py-4"><h4 class="font-normal text-80">Updates</h4></div>
                        <div class="w-3/4 py-4"><p class="text-90">
                            <div v-for="update in response.updates" :key="update._id" class="mb-2">
                                <p class="text-90 mb-1">Channel: {{ update.profile_service }}</p>
                                <div v-if="!update.shared_now">
                                    <p class="text-90 mb-1">Day: {{ update.day }}</p>
                                    <p class="text-90" v-if="update.due_time != '-'">Due time: {{ update.due_time }}</p>
                                </div>

                                <div v-else>
                                    <p class="text-90">Shared now</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </card>
    </div>
</template>

<script>
import IconBuffer from './iconbuffer'
import IconExternal from './iconexternal'
import IconDown from './icondown'

export default {
    props: ['resourceName', 'resourceId', 'field', 'panel'],

    data() {
        return {
            description: '',
            publishnow: false,
            processing: false,
            response: null,
            status: null,
            message: ''
        }
    },

    mounted() {

    },

    computed: {
        url() {
            return this.panel.fields[0].url
        },
        profileIds() {
            return this.panel.fields[0].profile_ids
        }
    },

    methods: {
        toggle() {
            this.publishnow = !this.publishnow
        },
        publish() {
            this.processing = true

            Nova.request()
                .post('/nova-vendor/nova-to-buffer', { url: this.url, description: this.description, now: this.publishnow })
                .then(response => {
                    this.processing = false
                    this.response = response.data.data
                    this.status = response.data.status
                    this.message = response.data.message
                })
                .catch(error => {
                    this.processing = false
                    this.status = response.data.status
                    this.message = response.data.message
                })
        },
        showHelp() {

        }
    },

    components: {
        IconBuffer,
        IconExternal,
        IconDown
    }
}
</script>
