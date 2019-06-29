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
import Preview from './preview'

export default {
    props: ['resourceName', 'resourceId', 'field', 'panel'],

    data() {
        return {
            description: '',
            publishnow: false,
            processing: false,
            response: null,
            responsed: {"updates":[{"_id":"5d16a867258cc50d7757a142","client_id":"5d13f8aad267c037bb2069a2","created_at":1561765991,"day":"No scheduled days or times","due_at":0,"due_time":"-","id":"5d16a867258cc50d7757a142","is_video_processing":false,"library_update_id":"","needs_approval":false,"organization_id":"5d13f7391366d5346f3c1125","perm_approvable":false,"perm_editable":true,"pinned":false,"profile_id":"5d1540122a12ce0b141dbd22","profile_service":"twitter","shared_now":false,"status":"buffer","text":"https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge","text_formatted":"<a class=\"url\" href=\"https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge\" rel=\"external nofollow\" target=\"_blank\">https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge</a>","text_md5":"0b42fc9e6f39da4343518f38208b767a","type":"link","updated_at":1561765991,"user_id":"5d13f7391366d5346f3c1124","via":"api","service_link":""},{"_id":"5d16a868258cc50d7757a143","client_id":"5d13f8aad267c037bb2069a2","created_at":1561765992,"day":"No scheduled days or times","due_at":0,"due_time":"-","id":"5d16a868258cc50d7757a143","is_video_processing":false,"library_update_id":"","media":{"link":"https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge","title":"Otvorene prijave za regionalni Elevator Lab Challenge | IT Base","description":"Raiffeisen Bank dd Bosna i Hercegovina objavila je službeni početak regionalnog projekta za startupe u oblasti finansijskih tehnologija, \"Elevator Lab Challenge\", koji je dio međunarodnog Elevator...","expanded_link":"https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge","preview":"https://itbase.ba/storage/img/posts/8305a1b4-55dc-48a2-931b-e94ad6efe5b9.png"},"needs_approval":false,"organization_id":"5d13f7391366d5346f3c1125","perm_approvable":false,"perm_editable":true,"pinned":false,"profile_id":"5d13f781311f3c63c430771e","profile_service":"facebook","shared_now":false,"status":"buffer","text":"","text_formatted":"","text_md5":"0b42fc9e6f39da4343518f38208b767a","type":"link","updated_at":1561765992,"user_id":"5d13f7391366d5346f3c1124","via":"api"}],"buffer_percentage":10,"buffer_count":1,"success":true,"message":"One more post in your Buffer. Keep it topped up!","code":false},
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
