<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
    //  this.le()
  },
  methods: {
    le(){
      if(window.WebSocket){
      var ws = new WebSocket('ws://localhost:8001');

      ws.onopen = function(e){
        console.log("连接服务器成功");
        // 向服务器发送消息
        ws.send("what`s your name?");
      }
      ws.onclose = function(e){
        console.log("服务器关闭");
      }
      ws.onerror = function(){
        console.log("连接出错");
      }
      let _this = this
      // 接收服务器的消息
      ws.onmessage = function(e){
        let message = "message:"+e.data+"";
        console.log(message);
        _this.$notify.success(e.data)
      }   
    }
    },
  }
}
</script>
