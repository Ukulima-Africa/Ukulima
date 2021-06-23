<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="uku-hero-buttons full-width" align="right">
            <q-btn type="a" href="/users-add" rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add User" />
          </div>
        </div>
      </div>
      <!-- Row of My Users -->
      <div class="uku-users-list row items-start justify-center">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-users-list-col">
          <q-table
            ref="table"
            title="Users"
            class="my-sticky-header-table"
            :data="orgUsers"
            :columns="columns"
            :separator="separator"
            row-key="uid"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
            :filter="filter"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            :selected.sync="selected"
            @selection="onSelection"
          >
            <!-- Template Slot Search -->
            <template #top-right>
              <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
                <q-icon slot="append" name="search" />
              </q-input>
            </template>
            <!-- Template Slot Status -->
            <template #body="props">
              <q-tr :props="props">
                <q-td>
                  <q-checkbox v-model="props.selected" color="black" />
                </q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                <q-td key="phoneNumber" :props="props">{{ props.row.phoneNumber }}</q-td>
                <q-td key="profileType" :props="props">{{ props.row.profileType }}</q-td>
                <q-td key="actions" :props="props">
                  <q-btn flat label="Edit" color="primary" @click="editUser(props.row.id)" />
                  <q-btn flat label="Delete" color="black" @click="deleteUser(props.row.id)" />
                </q-td>
              </q-tr>
            </template>
            <!-- Template Slot No Data -->
            <template #no-data="{}">
              <div class="full-width row flex-center text-black q-gutter-sm">
                <span>Nothing to see here at the moment</span>
              </div>
            </template>
            <!-- END Template Slot No Data -->
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Import Utils */
import users from '../util/functions/users'
/* LFG */
export default {
  name: 'UsersList',
  data() {
    return {
      title: 'Organisation Users',
      subtitle: 'Create additional Users for your Organisation',
      selected: [],
      filter: '',
      lastIndex: null,
      separator: 'cell',
      pagination: {
        rowsPerPage: 0,
      },
      orgUsers: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          label: 'Email Address',
          align: 'left',
          field: (row) => row.email,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'phoneNumber',
          required: true,
          label: 'Contact',
          align: 'left',
          field: (row) => row.phoneNumber,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'profileType',
          required: true,
          label: 'Profile Type',
          align: 'left',
          field: (row) => row.profileType,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center',
          style: 'min-width: 100px',
          field: (row) => row.id,
          format: (val) => `${val}`,
        },
      ],
    }
  },
  async created() {
    const usersData = await users.getUsers()
    this.orgUsers = usersData
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    onSelection({ rows, added, evt }) {
      if (rows.length === 0 || this.$refs.table === undefined) {
        return
      }
      const row = rows[0]
      const { filteredSortedRows } = this.$refs.table
      const rowIndex = filteredSortedRows.indexOf(row)
      const { lastIndex } = this
      this.lastIndex = rowIndex
      document.getSelection().removeAllRanges()
      if (this.$q.platform.is.mobile === true) {
        evt = { ctrlKey: true }
      } else if (evt !== Object(evt) || (evt.shiftKey !== true && evt.ctrlKey !== true)) {
        this.selected = added === true ? rows : []

        return
      }
      const operateSelection =
        added === true
          ? (selRow) => {
              const selectedIndex = this.selected.indexOf(selRow)
              if (selectedIndex === -1) {
                this.selected = this.selected.concat(selRow)
              }
            }
          : (selRow) => {
              const selectedIndex = this.selected.indexOf(selRow)
              if (selectedIndex > -1) {
                this.selected = this.selected.slice(0, selectedIndex).concat(this.selected.slice(selectedIndex + 1))
              }
            }
      if (lastIndex === null || evt.shiftKey !== true) {
        operateSelection(row)

        return
      }
      const from = lastIndex < rowIndex ? lastIndex : rowIndex
      const to = lastIndex < rowIndex ? rowIndex : lastIndex
      for (let i = from; i <= to; i += 1) {
        operateSelection(filteredSortedRows[i])
      }
    },
    editUser(userId) {
      console.log('UID : ', userId)
    },
    deleteUser(userId) {
      console.log('UID : ', userId)
    },
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"
.uku-users-list-col
  padding: 40px
.uku-users-title
  color: $black
  font-size: 32px
  line-height: 32px
  font-weight: 500
  letter-spacing 0.10px
  word-spacing 1px
  margin: 0 0 20px 0
.uku-users-subtitle
  color: $black
  font-size: 20px
  line-height: 24px
  font-weight: 400
  letter-spacing 0.5px
  margin: 0 0 15px 0
.uku-users-text
  color: $black
  font-size: 16px
  line-height: 24px
  font-weight: 400
  margin: 0 0 10px 0
.uku-table-layout
  width: 100%
  margin: 0
  padding: 0
/* Links & Buttons */
a,
.nuxt-link
  text-decoration: none
  cursor: pointer
  &:hover,
  &:active,
  &:focus,
  .nuxt-link-exact-active
    text-decoration: none
    cursor: pointer
/* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-users-list-col
    padding: 30px
/* $breakpoint-md: 959px */
@media only screen and (max-width: 959px)
  .hide-on-tablet
    display: none
  .uku-users-list-col
    padding: 20px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-users-list-col
    padding: 10px 10px 0 10px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-users-list-col
    padding: 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-users-list-col
    padding: 0
</style>
